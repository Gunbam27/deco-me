export function createShareLink(params: {
  ownerId: string;
  displayName?: string;
}) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const qs = new URLSearchParams({
    owner: params.ownerId,
    ...(params.displayName && { name: params.displayName }),
  });

  return `${baseUrl}/editor?${qs.toString()}`;
}
