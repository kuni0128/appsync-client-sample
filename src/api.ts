/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type NoteInput = {
  completed: boolean,
  id: string,
  name: string,
};

export type UpdateNoteInput = {
  completed?: boolean | null,
  id: string,
  name?: string | null,
};

export type CreateNoteMutationVariables = {
  note: NoteInput,
};

export type CreateNoteMutation = {
  createNote:  {
    __typename: "Note",
    completed: boolean,
    id: string,
    name: string,
  } | null,
};

export type DeleteNoteMutationVariables = {
  noteId: string,
};

export type DeleteNoteMutation = {
  deleteNote: string | null,
};

export type UpdateNoteMutationVariables = {
  note: UpdateNoteInput,
};

export type UpdateNoteMutation = {
  updateNote:  {
    __typename: "Note",
    completed: boolean,
    id: string,
    name: string,
  } | null,
};

export type GetNoteByIdQueryVariables = {
  noteId: string,
};

export type GetNoteByIdQuery = {
  getNoteById:  {
    __typename: "Note",
    completed: boolean,
    id: string,
    name: string,
  } | null,
};

export type ListNotesQuery = {
  listNotes:  Array< {
    __typename: "Note",
    completed: boolean,
    id: string,
    name: string,
  } | null > | null,
};

export type OnCreateNoteSubscription = {
  onCreateNote:  {
    __typename: "Note",
    completed: boolean,
    id: string,
    name: string,
  } | null,
};

export type OnDeleteNoteSubscription = {
  onDeleteNote: string | null,
};

export type OnUpdateNoteSubscription = {
  onUpdateNote:  {
    __typename: "Note",
    completed: boolean,
    id: string,
    name: string,
  } | null,
};
