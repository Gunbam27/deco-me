import { CharacterParts } from '@/types/character';
import { supabase } from '@/util/supabase';
import { unwrap } from '@/util/dbResult';

export async function createCharacter(params: {
  ownerId: string;
  createdBy: string;
  isSelf: boolean;
  parts: CharacterParts;
}) {
  const result = await supabase
    .from('characters')
    .insert({
      owner_id: params.ownerId,
      created_by: params.createdBy,
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

export async function getMyCharacter(ownerId: string) {
  const result = await supabase
    .from('characters')
    .select('*')
    .eq('owner_id', ownerId)
    .eq('is_self', true)
    .single();

  return unwrap(result);
}
