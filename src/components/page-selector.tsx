import { NativeSelect, NativeSelectOption } from "./ui/native-select";

type Props = {
  currentPage: number;
  nPages: number;
  onChoosePage: (page: number) => void;
};

export function PageSelector({ currentPage, nPages, onChoosePage }: Props) {
  return (
    <NativeSelect
      value={currentPage}
      onChange={(e) => {
        const selectedPage = Number(e.target.value);
        onChoosePage(selectedPage);
      }}
      className="w-[calc(2ch+1rem)] px-2 py-0 text-center"
      style={{ textAlignLast: "center" }} // About "text-align-last: center": https://stackoverflow.com/questions/11182559/text-align-is-not-working-on-safari-select
      showArrow={false}
    >
      {Array.from({ length: nPages }).map((_, i) => (
        <NativeSelectOption key={i} value={i + 1}>
          {i + 1}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
