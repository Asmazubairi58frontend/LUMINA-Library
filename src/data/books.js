const raw = [
 
export const cats = ["All", ...new Set(raw.map((r) => r[2]))];
