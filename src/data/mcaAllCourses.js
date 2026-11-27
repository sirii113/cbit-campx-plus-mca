// Complete Autonomous R-25 Syllabus Catalog Across All Semesters
// Chaitanya Bharathi Institute of Technology (Autonomous), Hyderabad
// Department of Computer Applications (MCA) - 2-Year Program (90 Total Credits)

export const CBIT_SEMESTERS = [
  { id: "all", name: "All Semesters Cumulative (4 Sems)", shortName: "All Sems", year: "All Years", totalCredits: 90 },
  { id: "sem_1", name: "Semester I", shortName: "Sem I", year: "1st Year", totalCredits: 22.5 },
  { id: "sem_2", name: "Semester II", shortName: "Sem II", year: "1st Year", totalCredits: 23.5 },
  { id: "sem_3", name: "Semester III", shortName: "Sem III", year: "2nd Year", totalCredits: 22 },
  { id: "sem_4", name: "Semester IV", shortName: "Sem IV", year: "2nd Year", totalCredits: 22 }
];

export const ALL_COURSES = [
  // ==========================================
  // SEMESTER I (1st Year, Semester I) - 22.5 Credits
  // ==========================================
  {
    code: "25MCC101",
    name: "Data Structures Using C++",
    short: "DS-C++",
    type: "Theory",
    credits: 4,
    semesterId: "sem_1",
    semesterName: "Semester I",
    year: "1st Year",
    faculty: "Dr. P. Suresh (Associate Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Propositional Logic & Truth Tables" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "First Order Predicate Calculus & Quantifiers" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Set Theory, Relations & Equivalence Classes" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Combinatorics & Pigeonhole Principle" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Recurrence Relations & Generating Functions" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Graph Theory, Eulerian & Hamiltonian Circuits" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Trees, Spanning Trees & Prim/Kruskal Algorithms" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Algebraic Structures, Semigroups & Monoids" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Lattices & Boolean Algebra" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L5", title: "Markov Chains & State Transitions" }
      ]
    }
  },
  {
    code: "25MCC102",
    name: "Computer Architecture",
    short: "Comp-Arch",
    type: "Theory",
    credits: 4,
    semesterId: "sem_1",
    semesterName: "Semester I",
    year: "1st Year",
    faculty: "Dr. B. Indira (HoD & Associate Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Asymptotic Complexity & Masters Theorem" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Amortized Analysis of Dynamic Arrays" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "AVL Trees & Red-Black Tree Balancing" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "B-Trees Indexing Mechanisms" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Dynamic Programming: Longest Common Subsequence" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Greedy Strategy & Huffman Coding" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Graph Flow & Max-Flow Min-Cut" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "String Matching (KMP & Rabin Karp)" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "NP-Completeness & Approximation" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L5", title: "Parallel & Distributed Algorithms Design" }
      ]
    }
  },
  {
    code: "25MCC103",
    name: "Object-Oriented Programming using Java",
    short: "OOP-Java",
    type: "Theory",
    credits: 4,
    semesterId: "sem_1",
    semesterName: "Semester I",
    year: "1st Year",
    faculty: "Dr. G. N. R. Prasad (Assistant Professor & PRO)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Relational Algebra & Normalization (BCNF, 4NF)" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Complex SQL Joins, Triggers & Views" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "ACID Properties & Transaction Schedules" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Concurrency Control & Two-Phase Locking" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Crash Recovery Protocols & ARIES Algorithm" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "CAP Theorem & PACELC Trade-offs" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Document & Key-Value Stores (MongoDB, Redis)" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Graph Databases & Cypher Queries (Neo4j)" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Distributed Sharding & Consistency Models" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L5", title: "Data Warehousing & OLAP Cubes" }
      ]
    }
  },
  {
    code: "25MCC104",
    name: "Computer Organization and Architecture",
    short: "COA",
    type: "Theory",
    credits: 3,
    semesterId: "sem_1",
    semesterName: "Semester I",
    year: "1st Year",
    faculty: "Sri P. Krishna Prasad (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Instruction Set Architecture (RISC vs CISC)" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Arithmetic Logic Unit & Booth Multiplication" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Memory Hierarchy & Cache Mapping Techniques" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Virtual Memory Management & Page Tables" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Pipelining & Pipeline Hazard Mitigation" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Superscalar & VLIW Processor Architecture" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "I/O Organization & Direct Memory Access (DMA)" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Multiprocessor Interconnection Networks" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Cache Coherence Protocols (MESI)" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L5", title: "GPU Computing & SIMD Architecture" }
      ]
    }
  },
  {
    code: "25MCC105",
    name: "Software Engineering & Agile DevOps",
    short: "SE-Agile",
    type: "Theory",
    credits: 3,
    semesterId: "sem_1",
    semesterName: "Semester I",
    year: "1st Year",
    faculty: "Sri P. Krishna Prasad (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Agile Scrum Framework & User Stories" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Software Requirements Engineering & SRS" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "UML Design Models & Architectural Patterns" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Clean Code Principles & Refactoring" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Test-Driven Development (TDD) & Unit Testing" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "DevOps CI/CD Pipelines with GitHub Actions" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Static Code Analysis (SonarQube) & Security" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Microservices Design & API Gateways" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Software Metrics & Defect Tracking" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Enterprise Software Maintenance & SRE" }
      ]
    }
  },
  {
    code: "25MCC111",
    name: "Data Structures & Algorithms Laboratory",
    short: "DSA-Lab",
    type: "Practical",
    credits: 1.5,
    semesterId: "sem_1",
    semesterName: "Semester I",
    year: "1st Year",
    faculty: "Dr. B. Indira (HoD & Associate Professor)",
    rubricCriteria: [
      { id: "code_correctness", name: "Problem Solving & Test Cases", weight: 35, desc: "Passes optimal time & space constraints" },
      { id: "code_quality", name: "Data Structure Implementation Elegance", weight: 25, desc: "Proper memory pointers, modular functions" },
      { id: "viva_voce", name: "Complexity Analysis Defense", weight: 25, desc: "Explain asymptotic bounds, worst-case invariants" },
      { id: "record_doc", name: "Lab Manual & Execution Verification", weight: 15, desc: "Clean markdown/Jupyter notebook submission" }
    ]
  },
  {
    code: "25MCC112",
    name: "Advanced Database Management Systems Laboratory",
    short: "DBMS-Lab",
    type: "Practical",
    credits: 1.5,
    semesterId: "sem_1",
    semesterName: "Semester I",
    year: "1st Year",
    faculty: "Dr. G. N. R. Prasad (Assistant Professor & PRO)",
    rubricCriteria: [
      { id: "code_correctness", name: "Complex SQL / NoSQL Query Correctness", weight: 30, desc: "Proper indexing, joins, aggregate queries" },
      { id: "code_quality", name: "Schema Normalization & Integrity", weight: 25, desc: "3NF/BCNF schemas, trigger implementations" },
      { id: "viva_voce", name: "Database Concurrency & Transaction Viva", weight: 25, desc: "2PL, ACID, isolation levels" },
      { id: "record_doc", name: "Observation & Query Screenshots", weight: 20, desc: "Verified output logs" }
    ]
  },
  {
    code: "25MCC113",
    name: "Python Programming Laboratory",
    short: "Python-Lab",
    type: "Practical",
    credits: 1.5,
    semesterId: "sem_1",
    semesterName: "Semester I",
    year: "1st Year",
    faculty: "Smt. G. Kavitha (Assistant Professor)",
    rubricCriteria: [
      { id: "code_correctness", name: "Pythonic Problem Solutions", weight: 35, desc: "List comprehensions, generators, decorators" },
      { id: "code_quality", name: "PEP-8 Standards & Clean Code", weight: 25, desc: "Modularity, docstrings, type hinting" },
      { id: "viva_voce", name: "OOP & Standard Library Viva", weight: 25, desc: "Itertools, collections, multi-threading" },
      { id: "record_doc", name: "Jupyter Notebook Submission", weight: 15, desc: "Verified notebook executions" }
    ]
  },

  // ==========================================
  // SEMESTER II (1st Year, Semester II) - 23.5 Credits
  // ==========================================
  {
    code: "25MCC106",
    name: "Full Stack Web Development (MERN & Next.js)",
    short: "FSWD",
    type: "Theory",
    credits: 3,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Sri B. Srinivas S. P. Kumar & Smt. T. Sravanthi",
    targetAttainmentThreshold: 65,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Modern ES6+, DOM & Virtual DOM reconciliation" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "State Management & React Hooks (useReducer, Context)" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Component Lifecycle & Side Effects (useEffect)" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Node.js Event Loop & Non-blocking I/O" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Express.js RESTful API & Middleware Pipeline" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "JWT Authentication & Role-Based Access Control" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "MongoDB Aggregation Pipelines & Mongoose" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "WebSockets & Real-Time Event Communication" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Docker Containerization & CI/CD Pipelines" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Microservices Architecture & System Design" }
      ]
    }
  },
  {
    code: "25MCC107",
    name: "Machine Learning & Intelligent Systems",
    short: "MLIS",
    type: "Theory",
    credits: 3,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Dr. D. Jayaram (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Supervised Learning: Linear & Logistic Regression" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Decision Trees & Random Forests Ensemble" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Support Vector Machines (SVM) & Kernel Trick" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Dimensionality Reduction with PCA" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Clustering Algorithms (K-Means, DBSCAN)" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Neural Networks & Backpropagation Algorithm" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Convolutional Neural Networks (CNN) for Computer Vision" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Recurrent Neural Networks (RNN) & LSTM" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Model Evaluation Metrics (ROC-AUC, F1-Score)" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Transformers & Attention Mechanism Foundations" }
      ]
    }
  },
  {
    code: "25MCC108",
    name: "Cloud Computing & Containerization (Docker/K8s)",
    short: "Cloud",
    type: "Theory",
    credits: 3,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Dr. M. Ramchander (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Cloud Service Models (IaaS, PaaS, SaaS)" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Virtualization Techniques & Hypervisors" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "AWS Core Services (EC2, S3, VPC Networking)" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Serverless Computing & AWS Lambda" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Cloud Security, IAM Policies & KMS" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "DevOps Philosophy & Infrastructure as Code (Terraform)" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Docker Architecture & Multi-Stage Builds" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Kubernetes Cluster Architecture & Pod Orchestration" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Site Reliability Engineering (SRE) & Monitoring" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Zero-Downtime Blue/Green Deployments" }
      ]
    }
  },
  {
    code: "25MCC109",
    name: "Mobile Application Development (Flutter & Android)",
    short: "MAD",
    type: "Theory",
    credits: 3,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Mr. Rambabu Potabattula (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Dart Programming Language & Object Orientation" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Flutter Widget Tree & Stateless/Stateful Widgets" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Responsive UI Layouts & Material Components" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "State Management with Provider and Riverpod" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "RESTful API Integration & JSON Serialization" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Local Persistence with SQLite & SharedPreferences" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Firebase Authentication & Cloud Firestore in Mobile" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Camera, GPS & Geolocation Native Sensors Access" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "App Performance Optimization & Profiling" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Deploying Android APK & iOS App Store Compliance" }
      ]
    }
  },
  {
    code: "25MCC110",
    name: "Cyber Security & Cryptographic Protocols",
    short: "CyberSec",
    type: "Theory",
    credits: 3,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Mr. Rambabu Potabattula (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Symmetric Encryption (AES, DES) & Block Ciphers" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Asymmetric Cryptography (RSA, Diffie-Hellman Key Exchange)" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Hash Functions (SHA-256) & Message Authentication Codes" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Public Key Infrastructure (PKI) & Digital Certificates" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "OWASP Top 10 Web Application Vulnerabilities (SQLi, XSS)" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Firewalls, Intrusion Detection & Prevention (IDS/IPS)" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Network Sniffing & Penetration Testing Tools (Wireshark, Nmap)" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Authentication Protocols (OAuth 2.0, OpenID Connect)" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Cloud & Zero-Trust Security Architectures" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Incident Response Protocols & Cyber Forensics Analysis" }
      ]
    }
  },
  {
    code: "25MCC114",
    name: "Full Stack Web Development Laboratory",
    short: "FSWD-Lab",
    type: "Practical",
    credits: 1.5,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Sri B. Srinivas S. P. Kumar (Assistant Professor)",
    rubricCriteria: [
      { id: "code_correctness", name: "MERN Application Functionality", weight: 35, desc: "React components, Node REST endpoints, MongoDB models" },
      { id: "code_quality", name: "Clean Architecture & State Flow", weight: 25, desc: "Modular hooks, async thunks, error middleware" },
      { id: "viva_voce", name: "REST vs GraphQL & Security Viva", weight: 25, desc: "CORS, JWT handling, query optimizations" },
      { id: "record_doc", name: "Deployed App Link & Swagger Specs", weight: 15, desc: "Live Vercel/Render URL and README documentation" }
    ]
  },
  {
    code: "25MCC115",
    name: "Machine Learning & AI Laboratory",
    short: "ML-Lab",
    type: "Practical",
    credits: 1.5,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Dr. D. Jayaram (Assistant Professor)",
    rubricCriteria: [
      { id: "code_correctness", name: "Model Accuracy & Hyperparameter Tuning", weight: 35, desc: "Trains cleanly, prevents overfitting" },
      { id: "code_quality", name: "Feature Engineering & Pipeline Cleanliness", weight: 25, desc: "Pandas/NumPy modular data pipelines" },
      { id: "viva_voce", name: "Mathematical Loss Function Viva", weight: 25, desc: "Calculus behind gradient descent" },
      { id: "record_doc", name: "Model Evaluation Plots & Confusion Matrix", weight: 15, desc: "ROC curves, classification reports" }
    ]
  },
  {
    code: "25MCC116",
    name: "Mobile Application Development Laboratory",
    short: "MAD-Lab",
    type: "Practical",
    credits: 1.5,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Mr. Rambabu Potabattula (Assistant Professor)",
    rubricCriteria: [
      { id: "code_correctness", name: "Flutter App Navigation & State", weight: 35, desc: "Cross-platform execution on Android" },
      { id: "code_quality", name: "Widget Tree Hierarchy & Architecture", weight: 25, desc: "Clean BLoC or Provider pattern" },
      { id: "viva_voce", name: "Mobile Lifecycle & Sensors Viva", weight: 25, desc: "Hardware integration, async streams" },
      { id: "record_doc", name: "APK Build & Execution Screenshots", weight: 15, desc: "Signed release APK & documentation" }
    ]
  },
  {
    code: "25MCC117",
    name: "Mini Project & Technical Seminar",
    short: "Mini-Project",
    type: "Project",
    credits: 2,
    semesterId: "sem_2",
    semesterName: "Semester II",
    year: "1st Year",
    faculty: "Dr. B. Indira & Sri P. Krishna Prasad",
    rubricCriteria: [
      { id: "code_correctness", name: "Working Software Demonstration", weight: 40, desc: "Functional system addressing domain problem" },
      { id: "code_quality", name: "Git Repo, Code Organization & Quality", weight: 25, desc: "Clean git history, documentation" },
      { id: "viva_voce", name: "Seminar Presentation & Technical Defense", weight: 25, desc: "Oral presentation, responding to panel queries" },
      { id: "record_doc", name: "Mini Project Report Submission", weight: 10, desc: "Approved format and verification" }
    ]
  },

  // ==========================================
  // SEMESTER III (2nd Year, Semester III) - 22 Credits
  // ==========================================
  {
    code: "25MCC201",
    name: "Big Data Analytics with Apache Spark",
    short: "BigData",
    type: "Theory",
    credits: 3,
    semesterId: "sem_3",
    semesterName: "Semester III",
    year: "2nd Year",
    faculty: "Smt. G. Kavitha (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Hadoop Ecosystem & HDFS Architecture" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "MapReduce Paradigm & Shuffle Phase" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "YARN Resource Allocation & Schedulers" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Apache Hive Tables, Partitioning & Bucketing" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "NoSQL Columnar Storage with Apache HBase" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Spark In-Memory RDDs & Transformations" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Spark DataFrames & Catalyst Optimizer" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Real-time Stream Processing with Kafka & Spark" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Distributed Machine Learning via Spark MLlib" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Data Lakehouse: Delta Lake & Iceberg" }
      ]
    }
  },
  {
    code: "25MCC202",
    name: "Natural Language Processing & Generative AI",
    short: "NLP-GenAI",
    type: "Theory",
    credits: 3,
    semesterId: "sem_3",
    semesterName: "Semester III",
    year: "2nd Year",
    faculty: "Dr. P. Suresh (Associate Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Text Tokenization, Stemming & Lemmatization" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Word Embeddings (Word2Vec, GloVe)" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "POS Tagging & Named Entity Recognition" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Sequence-to-Sequence & Attention Models" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Transformer Self-Attention Foundations" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "BERT & Masked Language Modeling" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "GPT Generative Pre-training & Autoregressive Decoding" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Retrieval-Augmented Generation (RAG) Architecture" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "LoRA Parameter-Efficient Fine-Tuning" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "LLM Safety Guardrails & Hallucination Metrics" }
      ]
    }
  },
  {
    code: "25MCC203",
    name: "DevOps CI/CD & Site Reliability Engineering",
    short: "DevOps-SRE",
    type: "Theory",
    credits: 3,
    semesterId: "sem_3",
    semesterName: "Semester III",
    year: "2nd Year",
    faculty: "Sri P. Krishna Prasad (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "DevOps Cultural Principles & CALMS Framework" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Advanced Git Workflows (Trunk-Based vs GitFlow)" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Automated Build Pipelines (GitHub Actions / Jenkins)" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Static Application Security Testing (SAST/DAST)" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Artifact Management (Docker Registry, Nexus)" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Infrastructure as Code with Terraform & Ansible" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Kubernetes Deployments, Ingress & Service Meshes" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Prometheus Monitoring & Grafana Dashboards" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Service Level Objectives (SLO, SLA, Error Budgets)" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Chaos Engineering & Incident Post-Mortems" }
      ]
    }
  },
  {
    code: "25MCC204",
    name: "Professional Elective I: Blockchain & Distributed Ledgers",
    short: "Blockchain",
    type: "Theory",
    credits: 3,
    semesterId: "sem_3",
    semesterName: "Semester III",
    year: "2nd Year",
    faculty: "Dr. M. Ramchander (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Cryptographic Hashes & Merkle Trees" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Consensus Algorithms (PoW, PoS, PBFT)" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Bitcoin Protocol & UTXO Transaction Model" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Ethereum Virtual Machine (EVM) Architecture" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Solidity Smart Contract Syntax & Events" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Smart Contract Security (Reentrancy, Gas Optimization)" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Decentralized Finance (DeFi) & Tokens (ERC-20/721)" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Permissioned Ledgers (Hyperledger Fabric)" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Zero-Knowledge Proofs (zk-SNARKs)" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Decentralized Applications (dApps) System Design" }
      ]
    }
  },
  {
    code: "25MCC205",
    name: "Professional Elective II: Internet of Things & Embedded Systems",
    short: "IoT",
    type: "Theory",
    credits: 3,
    semesterId: "sem_3",
    semesterName: "Semester III",
    year: "2nd Year",
    faculty: "Mr. Rambabu Potabattula (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "IoT Architecture & Sensing Layer Principles" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Microcontrollers (Arduino, ESP32, Raspberry Pi)" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Communication Protocols (MQTT, CoAP, ZigBee)" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Sensor Data Acquisition & ADC Conversion" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Edge Gateway Computing & Local Pre-processing" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Cloud IoT Platforms (AWS IoT Core, ThingsBoard)" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "IoT Security Protocols & Device Certificates" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Smart City & Industrial IoT (IIoT) Case Studies" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Low-Power WAN Technologies (LoRaWAN, NB-IoT)" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "TinyML: Deploying AI Models to Edge Microcontrollers" }
      ]
    }
  },
  {
    code: "25MCC211",
    name: "Big Data & GenAI Laboratory",
    short: "BigData-Lab",
    type: "Practical",
    credits: 1.5,
    semesterId: "sem_3",
    semesterName: "Semester III",
    year: "2nd Year",
    faculty: "Smt. G. Kavitha & Dr. P. Suresh",
    rubricCriteria: [
      { id: "code_correctness", name: "PySpark Job & RAG Pipeline Execution", weight: 35, desc: "Distributed queries and vector search" },
      { id: "code_quality", name: "Cluster Resource Efficiency & Pipeline Design", weight: 25, desc: "Partitioning, vector embedding storage" },
      { id: "viva_voce", name: "Spark Architecture & LLM Fine-Tuning Viva", weight: 25, desc: "Shuffling, context window, prompts" },
      { id: "record_doc", name: "Execution Notebooks & Output Visualizations", weight: 15, desc: "Spark cluster execution logs" }
    ]
  },
  {
    code: "25MCC212",
    name: "DevOps & Cloud Orchestration Laboratory",
    short: "DevOps-Lab",
    type: "Practical",
    credits: 1.5,
    semesterId: "sem_3",
    semesterName: "Semester III",
    year: "2nd Year",
    faculty: "Sri P. Krishna Prasad (Assistant Professor)",
    rubricCriteria: [
      { id: "code_correctness", name: "CI/CD Pipeline & Kubernetes Deployment", weight: 35, desc: "Passes automated test and deployment steps" },
      { id: "code_quality", name: "Terraform HCL & Dockerfile Standards", weight: 25, desc: "Idempotent scripts, least privilege configs" },
      { id: "viva_voce", name: "SRE Metrics & Kubernetes Ingress Viva", weight: 25, desc: "Rolling updates, probes, error budgets" },
      { id: "record_doc", name: "Pipeline Run Badges & Deployment Logs", weight: 15, desc: "GitHub actions logs and manifest files" }
    ]
  },
  {
    code: "25MCC213",
    name: "Industrial Internship & Capstone Project Phase-I",
    short: "Capstone-I",
    type: "Project",
    credits: 2,
    semesterId: "sem_3",
    semesterName: "Semester III",
    year: "2nd Year",
    faculty: "Dr. B. Indira & Department Review Committee",
    rubricCriteria: [
      { id: "code_correctness", name: "Industry Problem Definition & Architecture", weight: 35, desc: "Comprehensive requirements & prototype" },
      { id: "code_quality", name: "Technology Stack Evaluation & Design Specs", weight: 25, desc: "Architecture diagrams, DB schema, API design" },
      { id: "viva_voce", name: "Panel Defense & Industry Mentor Review", weight: 25, desc: "Response to review committee questions" },
      { id: "record_doc", name: "Phase-I Synopsis & Plagiarism Report", weight: 15, desc: "Proper documentation and company certificate" }
    ]
  },

  // ==========================================
  // SEMESTER IV (2nd Year, Semester IV) - 22 Credits
  // ==========================================
  {
    code: "25MCC206",
    name: "Open Elective: Tech Entrepreneurship & IP Management",
    short: "Tech-IP",
    type: "Theory",
    credits: 3,
    semesterId: "sem_4",
    semesterName: "Semester IV",
    year: "2nd Year",
    faculty: "Dr. G. N. R. Prasad (Assistant Professor & PRO)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Startup Ecosystem & Lean Canvas Methodology" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Minimum Viable Product (MVP) & Product-Market Fit" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Venture Financing: Angel, Seed & Series A Funding" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Unit Economics, CAC, LTV & Financial Modeling" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Intellectual Property Rights: Patents & Copyrights" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Patent Filing Procedures & Prior Art Searches" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Trade Secrets & Open Source Licensing (GPL, MIT, Apache)" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Go-to-Market (GTM) Strategy & Customer Acquisition" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Corporate Governance & Ethics for Tech Founders" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Exit Strategies: Mergers, Acquisitions & IPOs" }
      ]
    }
  },
  {
    code: "25MCC207",
    name: "Professional Elective III: Deep Learning & Computer Vision",
    short: "DL-CV",
    type: "Theory",
    credits: 3,
    semesterId: "sem_4",
    semesterName: "Semester IV",
    year: "2nd Year",
    faculty: "Dr. D. Jayaram (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Deep Feedforward Networks & Activation Functions" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Optimization for Deep Models (Adam, RMSProp)" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "CNN Architectures (ResNet, EfficientNet, VGG)" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Image Augmentation & Transfer Learning" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Object Detection Algorithms (YOLOv8, Faster R-CNN)" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Semantic & Instance Segmentation (Mask R-CNN, U-Net)" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Vision Transformers (ViT) Architecture" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Generative Adversarial Networks (GANs, Diffusion Models)" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Optical Character Recognition (OCR) & Document AI" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Edge Deployment of Vision Models (TensorRT, ONNX)" }
      ]
    }
  },
  {
    code: "25MCC214",
    name: "Major Project Work, Dissertation & Defense",
    short: "Major-Project",
    type: "Project",
    credits: 14,
    semesterId: "sem_4",
    semesterName: "Semester IV",
    year: "2nd Year",
    faculty: "Dr. B. Indira & Department Board of Examiners",
    rubricCriteria: [
      { id: "code_correctness", name: "Full Scale Software Implementation & Live Demo", weight: 40, desc: "Production quality software product" },
      { id: "code_quality", name: "System Architecture, Testing & Code Quality", weight: 25, desc: "Clean codebase, tests, CI/CD" },
      { id: "viva_voce", name: "External Board Viva-Voce & Technical Defense", weight: 25, desc: "Rigorous defense before external university panel" },
      { id: "record_doc", name: "Dissertation Thesis & Scopus/IEEE Publication", weight: 10, desc: "Plagiarism-free thesis & research paper" }
    ]
  },
  {
    code: "25MCC215",
    name: "Comprehensive Technical Viva-Voce",
    short: "Comp-Viva",
    type: "Evaluation",
    credits: 2,
    semesterId: "sem_4",
    semesterName: "Semester IV",
    year: "2nd Year",
    faculty: "Department Board of Studies & External Examiner",
    rubricCriteria: [
      { id: "core_cs", name: "Core Computer Science Fundamentals", weight: 35, desc: "Data structures, algorithms, OS, DBMS" },
      { id: "applied_tech", name: "Applied Engineering & Web/Cloud/AI", weight: 30, desc: "Modern full-stack, cloud, machine learning" },
      { id: "problem_solving", name: "Analytical Thinking & Problem Solving", weight: 25, desc: "Whiteboard design & architectural trade-offs" },
      { id: "communication", name: "Professional Presentation & Technical Articulation", weight: 10, desc: "Clarity, confidence, and terminology" }
    ]
  }
];
