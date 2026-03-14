import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import type { ChangeEventHandler, FormEventHandler } from "react";
import OnePieceGun from "/one-piece-gun.webp";
import { useChapterCount } from "@/hooks/use-chapter-count-query";

const route = getRouteApi("/(app)/");

export function GoToChapter() {
  const navigate = route.useNavigate();
  const chapterCount = useChapterCount();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newChapterInput, setNewChapterInput] = useState("");

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    let input = e.target.value;
    input = input.replace(/\s/g, "");
    input = input.replace(/[^0-9]/g, "");
    setNewChapterInput(input);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!newChapterInput) return;
    const newChapter = Number(newChapterInput);
    if (newChapter >= 1 && newChapter <= chapterCount) {
      navigate({ search: { chapter: newChapter } });
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setNewChapterInput("");
        setIsDialogOpen(open);
      }}
    >
      <DialogTrigger
        render={
          <Button
            className="absolute -inset-x-1 top-full mt-1 h-fit py-1 text-center text-xs italic"
            variant="secondary"
            size="xs"
          >
            Go to...
          </Button>
        }
      />

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="font-manga text-center">Go to...</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <Field>
            <FieldLabel htmlFor="new-chapter-input">
              Chapter (1 - {chapterCount})
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="new-chapter-input"
                inputMode="numeric"
                value={newChapterInput}
                onChange={onChangeInput}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-sm" variant="ghost" type="submit">
                  <img src={OnePieceGun} alt="Go" className="rotate-y-180" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  );
}
