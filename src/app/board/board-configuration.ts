export interface IBoardConfiguration {
  width: number;
  height: number;
  letters: string[];
}

export const DefaultBoardConfig: IBoardConfiguration = {
  width: 12,
  height: 9,
  letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
};
