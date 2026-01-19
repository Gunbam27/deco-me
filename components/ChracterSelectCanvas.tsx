'use client';
import { ACCESSORY, ANIMALS } from '@/types/character';
import { useEffect, useRef, useState } from 'react';
import { ThumbnailSlider } from './ThumbnailSlider';
import { useCharacterStore } from '@/store/charaterStore';
import Image from 'next/image';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import { AccessoryNode } from './AccessoryNode';
import useImage from 'use-image';
import { EditorMode } from '@/types/editormode';
import { createCharacter } from '@/service/charactersApi';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface Props {
  mode: EditorMode;
  ownerId: string;
  ownerName?: string;
  session: Session;
}

export function ChracterSelectCanvas({ mode, ownerId, ownerName, session }: Props) {
  const router = useRouter();
  //상수
  const MAX_SIZE = 300;
  const CHARACTER_RATIO = 1.5;

  //스토어 관련
  const selectedAnimal = useCharacterStore((s) => s.parts.animal);
  const accessories = useCharacterStore((s) => s.parts.accessories);
  const parts = useCharacterStore((s) => s.parts);
  const setPart = useCharacterStore((s) => s.setPart);
  const addAccessory = useCharacterStore((s) => s.addAccessory);
  const removeAccessory = useCharacterStore((s) => s.removeAccessory);
  const updateAccessory = useCharacterStore((s) => s.updateAccessory);

  //탭
  const tab = ['외형', '악세사리'];
  const [selectedTab, setSelectedTab] = useState(0);

  const animal = ANIMALS.find((a) => a.type === selectedAnimal);
  const [animalImage] = useImage(animal?.src || '');

  const transformerRef = useRef<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  //반응형 스테이지 사이즈 계산
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState(MAX_SIZE);
  const characterSize = stageSize * CHARACTER_RATIO;
  const offset = (stageSize - characterSize) / 2;

  // 탭 관련
  function onClickTab(selectedTab: number) {
    setSelectedTab(selectedTab);
  }

  async function handleSave() {
    if (!session?.user) {
      alert('로그인이 필요합니다');
      return;
    }

    const userId = session.user.id;
    const userName = session.user.user_metadata?.display_name ||
                    session.user.user_metadata?.name ||
                    '친구';

    try {
      setSaving(true);
      await createCharacter({
        ownerId,
        ownerName,
        createdBy: userId,
        createdByName: userName,
        isSelf: mode === 'self',
        parts,
      });
      setSavedModalOpen(true);
    } finally {
      setSaving(false);
    }
  }

  // 리사이징 관련
  useEffect(() => {
    function resize() {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setStageSize(Math.min(width, MAX_SIZE));
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section className="mx-auto max-w-[480px] p-4 space-y-4">
      {/* 저장 완료 모달 */}
      {savedModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSavedModalOpen(false)}
          />
          <div className="relative w-full max-w-sm rounded-3xl bg-white shadow-xl border border-pink-200 p-5">
            <h3 className="text-brown-500 text-lg font-bold text-center">
              저장됐어요!
            </h3>
            <p className="mt-2 text-center text-sm text-gray-600">
              옷장에서 확인할 수 있어요.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                className="flex-1 py-2.5 rounded-2xl bg-pink-100 text-brown-500 font-semibold hover:bg-pink-200 transition"
                onClick={() => setSavedModalOpen(false)}
              >
                닫기
              </button>
              <button
                className="flex-1 py-2.5 rounded-2xl bg-brown-500 text-white font-semibold shadow hover:bg-brown-700 transition"
                onClick={() => router.push('/closet')}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Card */}
      <div ref={containerRef} className="w-full flex justify-center">
        <div className="bg-white rounded-2xl shadow-lg touch-none">
          <Stage
            width={stageSize}
            height={stageSize}
            onMouseDown={(e) => {
              const target = e.target;

              const isAccessoryOrTransformer =
                target.hasName('accessory') ||
                target.findAncestor('.accessory') ||
                target.hasName('transformer') ||
                target.findAncestor('.transformer');

              if (!isAccessoryOrTransformer) {
                setSelectedId(null);
                transformerRef.current?.nodes([]);
              }
            }}
            onTouchStart={(e) => {
              const target = e.target;

              const isAccessoryOrTransformer =
                target.hasName('accessory') ||
                target.findAncestor('.accessory') ||
                target.hasName('transformer') ||
                target.findAncestor('.transformer');

              if (!isAccessoryOrTransformer) {
                setSelectedId(null);
                transformerRef.current?.nodes([]);
              }
            }}
            style={{ touchAction: 'none' }} // 모바일 바운딩 박스 터치안되는 문제
          >
            <Layer>
              {animalImage && (
                <KonvaImage
                  listening={false}
                  image={animalImage}
                  x={offset}
                  y={offset}
                  width={characterSize}
                  height={characterSize}
                />
              )}
              {accessories.map((acce) => (
                <AccessoryNode
                  key={acce.id}
                  acce={acce}
                  isSelected={acce.id === selectedId}
                  onSelect={() => setSelectedId(acce.id)}
                  onChange={(attrs) => updateAccessory(acce.id, attrs)}
                  transformerRef={transformerRef}
                />
              ))}
              <Transformer
                name="transformer"
                ref={transformerRef}
                rotateEnabled={true}
                enabledAnchors={[
                  'top-left',
                  'top-right',
                  'bottom-left',
                  'bottom-right',
                ]}
                anchorSize={26} // ⭐ 핵심
                anchorCornerRadius={13}
                borderStroke="rgba(0,0,0,0.5)"
                borderStrokeWidth={2}
              />
            </Layer>
          </Stage>
        </div>
      </div>
      <div className="flex bg-pink-100 rounded-full p-1 shadow-lg">
        {tab.map((label, index) => {
          const active = index === selectedTab;
          return (
            <button
              key={label}
              onClick={() => onClickTab(index)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition
          ${active ? 'bg-brown-500 text-white shadow' : 'text-brown-500'}
        `}
            >
              {label}
            </button>
          );
        })}
      </div>
      {/* Slider */}
      {selectedTab === 0 ? (
        <ThumbnailSlider
          items={ANIMALS}
          cols={4}
          rows={2}
          isSelected={(animal) => animal.type === selectedAnimal}
          onSelect={(animal) => setPart('animal', animal.type)}
          renderItem={(animal) => (
            <Image
              src={animal.src}
              alt={animal.name}
              width={100}
              height={100}
            />
          )}
        />
      ) : null}
      {selectedTab === 1 ? (
        <ThumbnailSlider
          items={ACCESSORY}
          cols={4}
          rows={2}
          isSelected={(acce) => accessories.some((a) => a.src === acce.src)}
          onSelect={(acce) => addAccessory(acce)}
          renderItem={(animal) => (
            <Image src={animal.src} alt={animal.name} width={40} height={40} />
          )}
          onRemove={(acce) => {
            removeAccessory(acce.id); // 스토어에서 제거
            if (selectedId === acce.id) {
              setSelectedId(null);
              transformerRef.current?.nodes([]);
            }
          }}
        />
      ) : null}
      <div className="text-center">
        {mode !== 'readonly' && (
          <button
            className="flex-1 py-2 w-20 rounded-full text-sm font-semibold transition
          bg-brown-500 text-white shadow
        "
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '저장 중...' : mode == 'self' ? '저장하기' : '친구에게 보내기'}
          </button>
        )}
      </div>
    </section>
  );
}
