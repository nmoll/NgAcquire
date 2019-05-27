export interface IBoardConfig {
  width: number;
  height: number;
  letters: string[];
}

export const DefaultBoardConfig: IBoardConfig = {
  width: 12,
  height: 9,
  letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
};
