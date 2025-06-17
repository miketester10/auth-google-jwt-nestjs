import { faker } from '@faker-js/faker';
import { Todo } from 'src/todo/entities/todo.entity';
import { GoogleUser } from 'src/user/entities/user.entity';

const sampleTitles = [
  'Comprare il pane',
  'Portare fuori il cane',
  'Sistemare la scrivania',
  'Pagare le bollette',
  'Scrivere un’email al capo',
  'Andare in palestra',
  'Preparare la cena',
  'Studiare per l’esame',
  'Pulire la cucina',
  'Fare la spesa',
  'Lavare la macchina',
  'Rinnovare l’abbonamento dei mezzi',
  'Sistemare la camera',
  'Inviare il curriculum',
  'Leggere un capitolo del libro',
  'Ritirare il pacco in posta',
  'Organizzare i documenti',
  'Controllare il conto in banca',
  'Fare backup del computer',
  'Innaffiare le piante',
];

const sampleDescriptions = [
  'Da fare entro le 18 per evitare la fila.',
  'Verificare se ci sono anche sconti disponibili.',
  'Pulire anche sotto la tastiera e gli angoli.',
  'Controllare la scadenza prima di pagare.',
  'Inviare entro fine giornata lavorativa.',
  'Non dimenticare la scheda d’ingresso.',
  'Verificare cosa manca in frigo prima.',
  'Usare la tecnica del pomodoro per studiare.',
  'Pulire anche il lavandino e il forno.',
  'Comprare anche frutta e verdura.',
  'Portare le buste di stoffa riutilizzabili.',
  'Pulire anche l’interno dell’auto.',
  'Verificare il nuovo piano tariffario.',
  'Cambiare le lenzuola.',
  'Ricontrollare gli errori prima di inviare.',
  'Leggere prima di andare a dormire.',
  'Portare il codice di ritiro.',
  'Mettere ordine anche tra le ricevute.',
  'Annotare spese sospette.',
  'Collegare il disco esterno prima di iniziare.',
];

export const todoFactory = (user: GoogleUser): Partial<Todo> => ({
  title: faker.helpers.arrayElement(sampleTitles),
  description: faker.helpers.arrayElement(sampleDescriptions),
  completed: faker.datatype.boolean(),
  user,
});
