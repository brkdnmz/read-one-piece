import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import type { ChangeEventHandler } from "react";
import { N_CHAPTERS } from "@/constants";
import OnePieceGun from "/one-piece-gun.png";

const route = getRouteApi("/(app)/");

export function GoToChapter() {
  const navigate = useNavigate();
  const { chapter } = route.useSearch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newChapterInput, setNewChapterInput] = useState(chapter.toString());

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    let input = e.target.value;
    input = input.replace(/\s/g, "");
    input = input.replace(/[^0-9]/g, "");
    setNewChapterInput(input);
  };

  const onSubmit = () => {
    if (!newChapterInput) return;
    const newChapter = Number(newChapterInput);
    if (newChapter >= 1 && newChapter <= N_CHAPTERS) {
      navigate({ to: "/", search: { chapter: newChapter } });
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setNewChapterInput(chapter.toString());
        setIsDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="absolute inset-x-0 top-full mt-1 h-fit py-1 text-center text-xs italic"
          variant="secondary"
          size="xs"
        >
          Go to...
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Go to...</DialogTitle>
        <Field>
          <FieldLabel htmlFor="new-chapter-input">
            Chapter (1 - {N_CHAPTERS})
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="new-chapter-input"
              inputMode="numeric"
              value={newChapterInput}
              onChange={onChangeInput}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-sm"
                variant="ghost"
                onClick={onSubmit}
              >
                <img src={OnePieceGun} alt="Go" className="rotate-y-180" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </DialogContent>
    </Dialog>
  );
}
