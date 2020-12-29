/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNoteById = /* GraphQL */ `
  query GetNoteById($noteId: String!) {
    getNoteById(noteId: $noteId) {
      completed
      id
      name
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes {
    listNotes {
      completed
      id
      name
    }
  }
`;
