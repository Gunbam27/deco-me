import { CharacterParts } from '@/types/character';
import { supabase } from '@/util/supabase';
import { unwrap } from '@/util/dbResult';

export async function createCharacter(params: {
  ownerId: string;
  ownerName?: string;
  createdBy: string;
  createdByName?: string;
  isSelf: boolean;
  parts: CharacterParts;
}) {
  const result = await supabase
    .from('characters')
    .insert({
      owner_id: params.ownerId,
      owner_name: params.ownerName,
      created_by: params.createdBy,
      created_by_name: params.createdByName,
      is_self: params.isSelf,
      parts: params.parts,
    })
    .select()
    .single();

  return unwrap(result);
}

export async function getCharacterByOwnerId(ownerId: string) {
  const result = await supabase
    .from('characters')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });

  return unwrap(result);
}

export async function getCharactersForCloset(userId: string) {
  const result = await supabase
    .from('characters')
    .select('*')
    .or(`owner_id.eq.${userId},created_by.eq.${userId}`)
    .order('created_at', { ascending: false });

  return unwrap(result);
}

export async function getMyCharacter(ownerId: string) {
  const result = await supabase
    .from('characters')
    .select('*')
    .eq('owner_id', ownerId)
    .eq('is_self', true)
    .single();

  return unwrap(result);
}
