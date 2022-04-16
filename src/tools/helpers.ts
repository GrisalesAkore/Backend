export function responseDto(dto: { data?: Object; error?: Object }) {
  return {
    data: dto.data || null,
    error: dto.error || null,
  };
}
