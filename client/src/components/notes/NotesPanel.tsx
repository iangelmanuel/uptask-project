import { Task } from '@/types'

import { AddNoteForm } from './AddNoteForm'
import { NoteDetail } from './NoteDetail'

type Props = {
  notes: Task['notes']
}

export const NotesPanel = ({ notes }: Props) => {
  return (
    <>
      <AddNoteForm />

      <div className="mt-10 divide-y divide-gray-100">
        {notes.length ? (
          <>
            <p className="font-bol my-5 text-2xl text-slate-600">Notas:</p>
            {notes.map((note) => (
              <NoteDetail key={note._id} note={note} />
            ))}
          </>
        ) : (
          <p className="pt-3 text-center text-gray-100">No hay notas</p>
        )}
      </div>
    </>
  )
}
