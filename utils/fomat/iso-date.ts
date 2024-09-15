export const formatIsoDate = (date: Date) => {
  const isoDate = new Date(date).toISOString()
  const strDate = isoDate.split("T")[0] // 2024-08-23形式に変換
  return strDate
}
