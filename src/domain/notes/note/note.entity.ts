import { Entity } from "@/domain/entity";
import { Note } from "./note";

export class NoteEntity extends Entity<Note> {
  foo () {
    console.log("---- foo -----")
    console.log(this.entity)
  }
}