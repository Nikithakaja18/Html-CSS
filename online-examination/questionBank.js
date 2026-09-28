const defaultExam = {
  slug: 'fundamentals',
  title: 'Full-stack fundamentals',
  subtitle: 'Measure the skills that power modern web products.',
  durationMinutes: 10,
  questions: [
    {
      id: 1,
      topic: 'JavaScript',
      difficulty: 'Intermediate',
      text: 'Which method creates a new array with the results of calling a function on every element?',
      options: ['forEach()', 'map()', 'filter()', 'reduce()'],
      answer: 1,
      explanation: 'map() returns a new array containing the transformed value for each original element.'
    },
    {
      id: 2,
      topic: 'Node.js',
      difficulty: 'Intermediate',
      text: 'Which built-in Node.js module is commonly used to create an HTTP server?',
      options: ['path', 'events', 'http', 'stream'],
      answer: 2,
      explanation: 'The http module provides the APIs needed to create HTTP servers and clients.'
    },
    {
      id: 3,
      topic: 'Web',
      difficulty: 'Beginner',
      text: 'What does the CSS property display: flex primarily define?',
      options: ['A two-dimensional grid', 'A flexible one-dimensional layout', 'A font family', 'An animation timeline'],
      answer: 1,
      explanation: 'Flexbox is designed for arranging items in a one-dimensional row or column.'
    },
    {
      id: 4,
      topic: 'Databases',
      difficulty: 'Intermediate',
      text: 'Which SQL command is used to retrieve records from a table?',
      options: ['PUSH', 'SELECT', 'FETCH ALL', 'READ'],
      answer: 1,
      explanation: 'SELECT queries retrieve data from one or more database tables.'
    },
    {
      id: 5,
      topic: 'Security',
      difficulty: 'Advanced',
      text: 'What is the primary purpose of hashing a user password?',
      options: ['To make it shorter', 'To encrypt network traffic', 'To store a one-way representation', 'To improve database speed'],
      answer: 2,
      explanation: 'A secure password hash is a one-way representation that can be verified without storing the original password.'
    },
    {
      id: 6,
      topic: 'JavaScript',
      difficulty: 'Beginner',
      text: 'Which keyword declares a block-scoped variable that can be reassigned?',
      options: ['const', 'let', 'varies', 'static'],
      answer: 1,
      explanation: 'let declares a block-scoped variable whose value may be reassigned.'
    },
    {
      id: 7,
      topic: 'APIs',
      difficulty: 'Intermediate',
      text: 'Which HTTP status code indicates a successful resource creation?',
      options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
      answer: 1,
      explanation: '201 Created confirms that a request succeeded and created a new resource.'
    },
    {
      id: 8,
      topic: 'Architecture',
      difficulty: 'Advanced',
      text: 'What is the main benefit of separating a web client from its API?',
      options: ['It removes the need for testing', 'It couples deployments tightly', 'It allows independent interfaces and services', 'It guarantees zero latency'],
      answer: 2,
      explanation: 'A separated client and API can evolve, deploy, and serve different clients independently.'
    }
  ]
};

const subjectExams = {
  java: {
    slug: 'java',
    title: 'Java',
    subtitle: 'Core language concepts and object-oriented programming.',
    durationMinutes: 10,
    questions: [
      { id: 1, topic: 'Java', difficulty: 'Beginner', text: 'Which keyword prevents a class from being subclassed?', options: ['static', 'final', 'private', 'abstract'], answer: 1, explanation: 'A class declared final cannot be extended by another class.' },
      { id: 2, topic: 'Java', difficulty: 'Beginner', text: 'What is the width of the primitive int type in Java?', options: ['16 bits', '32 bits', '64 bits', 'It depends on the platform'], answer: 1, explanation: 'Java defines int as a signed 32-bit integer on every platform.' },
      { id: 3, topic: 'Java', difficulty: 'Intermediate', text: 'Which collection provides indexed access while preserving insertion order?', options: ['HashSet', 'TreeMap', 'ArrayList', 'PriorityQueue'], answer: 2, explanation: 'ArrayList is a resizable list that preserves element order and supports indexed access.' },
      { id: 4, topic: 'Java', difficulty: 'Intermediate', text: 'For two object references, what does == compare?', options: ['Their field values', 'Their hash codes', 'Whether they refer to the same object', 'Their class names'], answer: 2, explanation: 'For object references, == checks identity; equals() is commonly used for logical equality.' },
      { id: 5, topic: 'Java', difficulty: 'Intermediate', text: 'How must a checked exception generally be handled?', options: ['It is always ignored', 'It must be caught or declared', 'It is converted to an Error', 'It only occurs at compile time'], answer: 1, explanation: 'Java requires checked exceptions to be caught or declared with throws.' }
    ]
  },
  python: {
    slug: 'python',
    title: 'Python',
    subtitle: 'Python syntax, built-ins, and core behavior.',
    durationMinutes: 10,
    questions: [
      { id: 1, topic: 'Python', difficulty: 'Beginner', text: 'Which built-in function returns the number of items in a sequence?', options: ['size()', 'count()', 'len()', 'range()'], answer: 2, explanation: 'len() returns the number of items in a sequence or collection.' },
      { id: 2, topic: 'Python', difficulty: 'Beginner', text: 'Which statement about Python dictionary keys is true?', options: ['Keys must be unique', 'Keys must be strings', 'Keys preserve duplicates', 'Keys must be integers'], answer: 0, explanation: 'Dictionary keys are unique; assigning an existing key updates its associated value.' },
      { id: 3, topic: 'Python', difficulty: 'Intermediate', text: 'What is the conventional purpose of __init__ in a class?', options: ['Destroy an instance', 'Initialize a new instance', 'Import a module', 'Define a class variable'], answer: 1, explanation: '__init__ initializes instance attributes after an object is created.' },
      { id: 4, topic: 'Python', difficulty: 'Intermediate', text: 'What does the is operator test?', options: ['Value equality', 'Type compatibility', 'Object identity', 'Whether an object is iterable'], answer: 2, explanation: 'is checks whether two references point to the same object.' },
      { id: 5, topic: 'Python', difficulty: 'Beginner', text: 'Which built-in collection is immutable?', options: ['list', 'dict', 'set', 'tuple'], answer: 3, explanation: 'A tuple cannot be modified after it has been created.' }
    ]
  },
  dbms: {
    slug: 'dbms',
    title: 'DBMS',
    subtitle: 'Relational databases, keys, and transaction fundamentals.',
    durationMinutes: 10,
    questions: [
      { id: 1, topic: 'DBMS', difficulty: 'Beginner', text: 'What property must a primary key have?', options: ['It may contain duplicate values', 'It uniquely identifies each row', 'It must reference another table', 'It stores only text'], answer: 1, explanation: 'A primary key uniquely identifies each row and cannot be null.' },
      { id: 2, topic: 'DBMS', difficulty: 'Beginner', text: 'What is the purpose of a foreign key?', options: ['To encrypt a column', 'To sort query results', 'To reference a key in another table', 'To create a backup'], answer: 2, explanation: 'A foreign key links rows across tables and helps enforce referential integrity.' },
      { id: 3, topic: 'DBMS', difficulty: 'Intermediate', text: 'In ACID transactions, what does atomicity mean?', options: ['A transaction happens completely or not at all', 'Transactions always run in alphabetical order', 'Data is stored in one table', 'Every query is automatically cached'], answer: 0, explanation: 'Atomicity ensures a transaction is treated as one indivisible unit of work.' },
      { id: 4, topic: 'DBMS', difficulty: 'Intermediate', text: 'Which design goal is associated with first normal form (1NF)?', options: ['Every table has two primary keys', 'Each field contains an atomic value', 'All tables must have the same columns', 'Every relation must be sorted'], answer: 1, explanation: 'First normal form requires each row-column intersection to contain a single atomic value.' },
      { id: 5, topic: 'DBMS', difficulty: 'Intermediate', text: 'What is a common trade-off when adding a database index?', options: ['Reads become impossible', 'Queries no longer use SQL', 'Reads can be faster but writes need index maintenance', 'The table cannot contain null values'], answer: 2, explanation: 'Indexes can speed up lookups, but inserts and updates must also maintain them.' }
    ]
  },
  'data-structures': {
    slug: 'data-structures',
    title: 'Data Structures',
    subtitle: 'Common structures, operations, and complexity.',
    durationMinutes: 10,
    questions: [
      { id: 1, topic: 'Data Structures', difficulty: 'Beginner', text: 'Which order does a stack use?', options: ['FIFO', 'LIFO', 'Sorted order', 'Random order'], answer: 1, explanation: 'A stack is last in, first out: the most recently added item is removed first.' },
      { id: 2, topic: 'Data Structures', difficulty: 'Beginner', text: 'Which order does a standard queue use?', options: ['LIFO', 'Highest priority first', 'FIFO', 'Reverse alphabetical'], answer: 2, explanation: 'A queue is first in, first out: items leave in the order they arrived.' },
      { id: 3, topic: 'Data Structures', difficulty: 'Intermediate', text: 'What is the time complexity of binary search on a sorted array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 1, explanation: 'Binary search halves the remaining search interval on each step, giving O(log n) time.' },
      { id: 4, topic: 'Data Structures', difficulty: 'Intermediate', text: 'What is the average lookup time for a well-distributed hash table?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], answer: 0, explanation: 'With a suitable hash function and controlled collisions, lookup is O(1) on average.' },
      { id: 5, topic: 'Data Structures', difficulty: 'Intermediate', text: 'What is the time complexity of inserting a node at the head of a linked list?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 0, explanation: 'Head insertion only updates a fixed number of pointers, so it takes O(1) time.' }
    ]
  },
  'operating-systems': {
    slug: 'operating-systems',
    title: 'Operating Systems',
    subtitle: 'Processes, scheduling, memory, and concurrency basics.',
    durationMinutes: 10,
    questions: [
      { id: 1, topic: 'Operating Systems', difficulty: 'Beginner', text: 'What is a process?', options: ['A program currently executing', 'A file stored on disk only', 'A CPU instruction set', 'A network protocol'], answer: 0, explanation: 'A process is an instance of a program being executed, with its own operating-system-managed resources.' },
      { id: 2, topic: 'Operating Systems', difficulty: 'Intermediate', text: 'Which resource is commonly shared by threads in the same process?', options: ['Their program counter', 'Their stack', 'The process address space', 'Their register values'], answer: 2, explanation: 'Threads in one process share its address space and many process resources, but have their own stacks and registers.' },
      { id: 3, topic: 'Operating Systems', difficulty: 'Beginner', text: 'How does round-robin scheduling allocate CPU time?', options: ['By process name', 'Using a repeating time slice for each ready process', 'Only to the shortest job', 'Only when a process exits'], answer: 1, explanation: 'Round-robin gives each ready process a time slice in turn.' },
      { id: 4, topic: 'Operating Systems', difficulty: 'Intermediate', text: 'What does virtual memory allow an operating system to do?', options: ['Run without physical memory', 'Present processes with an address space backed by memory and storage', 'Eliminate page faults', 'Guarantee every process uses the same addresses'], answer: 1, explanation: 'Virtual memory maps process address spaces to physical memory and can use storage as backing for pages.' },
      { id: 5, topic: 'Operating Systems', difficulty: 'Intermediate', text: 'Which action can prevent deadlock by breaking the hold-and-wait condition?', options: ['Require a process to request needed resources together', 'Increase the number of processes', 'Disable process scheduling', 'Allow circular waits'], answer: 0, explanation: 'Requiring resources to be requested together can remove hold-and-wait, one of the necessary deadlock conditions.' }
    ]
  },
  'computer-networks': {
    slug: 'computer-networks',
    title: 'Computer Networks',
    subtitle: 'Protocols, addressing, and network services.',
    durationMinutes: 10,
    questions: [
      { id: 1, topic: 'Computer Networks', difficulty: 'Beginner', text: 'What does DNS primarily do?', options: ['Encrypts local files', 'Maps domain names to IP addresses', 'Assigns CPU time', 'Compresses web pages'], answer: 1, explanation: 'DNS resolves domain names to the IP addresses used to reach network hosts.' },
      { id: 2, topic: 'Computer Networks', difficulty: 'Beginner', text: 'Which transport protocol provides reliable, ordered byte delivery?', options: ['UDP', 'IP', 'TCP', 'ARP'], answer: 2, explanation: 'TCP provides reliable, ordered delivery through acknowledgments and retransmission.' },
      { id: 3, topic: 'Computer Networks', difficulty: 'Intermediate', text: 'Which statement best describes UDP?', options: ['It establishes a reliable connection before sending', 'It is connectionless and does not guarantee delivery', 'It replaces IP addressing', 'It guarantees packet order'], answer: 1, explanation: 'UDP is connectionless and provides no built-in guarantee of delivery or ordering.' },
      { id: 4, topic: 'Computer Networks', difficulty: 'Beginner', text: 'What does HTTPS add to HTTP?', options: ['TLS encryption and server authentication', 'A different IP addressing scheme', 'A guaranteed faster connection', 'Automatic database replication'], answer: 0, explanation: 'HTTPS uses TLS to protect traffic and authenticate the server endpoint.' },
      { id: 5, topic: 'Computer Networks', difficulty: 'Beginner', text: 'How many bits are in an IPv4 address?', options: ['16', '32', '64', '128'], answer: 1, explanation: 'An IPv4 address is 32 bits long, typically written as four decimal octets.' }
    ]
  },
  'machine-learning': {
    slug: 'machine-learning',
    title: 'Machine Learning',
    subtitle: 'Learning types, model evaluation, and common tasks.',
    durationMinutes: 10,
    questions: [
      { id: 1, topic: 'Machine Learning', difficulty: 'Beginner', text: 'What characterizes supervised learning?', options: ['Training data includes target labels', 'The model never sees examples', 'Only rewards are used, with no data', 'The model stores every answer unchanged'], answer: 0, explanation: 'Supervised learning uses examples paired with known target labels or values.' },
      { id: 2, topic: 'Machine Learning', difficulty: 'Intermediate', text: 'What is overfitting?', options: ['A model performs well on training data but poorly on unseen data', 'A model has no parameters', 'A dataset contains no features', 'A model always predicts the mean'], answer: 0, explanation: 'An overfit model captures training-specific patterns that do not generalize well.' },
      { id: 3, topic: 'Machine Learning', difficulty: 'Beginner', text: 'Which task predicts a category such as spam or not spam?', options: ['Regression', 'Classification', 'Clustering', 'Dimensionality reduction'], answer: 1, explanation: 'Classification predicts a discrete class or category.' },
      { id: 4, topic: 'Machine Learning', difficulty: 'Beginner', text: 'Which task typically predicts a continuous numeric value?', options: ['Classification', 'Regression', 'Tokenization', 'Sorting'], answer: 1, explanation: 'Regression models predict numeric values on a continuous scale.' },
      { id: 5, topic: 'Machine Learning', difficulty: 'Intermediate', text: 'Why keep a test set separate from training data?', options: ['To increase the training set labels', 'To estimate performance on data not used to fit the model', 'To guarantee perfect accuracy', 'To remove all model parameters'], answer: 1, explanation: 'A held-out test set provides an estimate of how well the fitted model generalizes to unseen examples.' }
    ]
  }
};

module.exports = { defaultExam, subjectExams };
