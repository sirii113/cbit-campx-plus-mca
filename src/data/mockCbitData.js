// CBIT MCA Academic Structure & Realistic Cohort Dataset - R25 Regulation
// Chaitanya Bharathi Institute of Technology (Autonomous), Hyderabad
// Department of Computer Applications (MCA) - R25 Autonomous Syllabus
// All Courses Start with 25MCC & All Authentic CBIT MCA Faculty (Sirs and Mams)

export const CBIT_INFO = {
  collegeName: "Chaitanya Bharathi Institute of Technology (Autonomous)",
  subHeader: "Affiliated to Osmania University | Accredited by NBA & NAAC (A++)",
  location: "Kokapet (V), Gandipet, Hyderabad, Telangana - 500075",
  department: "Department of Computer Applications (MCA)",
  academicYear: "2025 - 2027",
  currentSemester: "Semester II",
  regulation: "R-25 Autonomous Syllabus",
  cieSchemeDescription: "R25 Scheme: Mid Average (20M) + 3 Slip Tests (5M each = 15M) + Assignment Average (10M) = 45M Total CIE",
  coeHeader: "CONTROLLER OF EXAMINATIONS - CONTINUOUS INTERNAL EVALUATION (CIE) REPORT (R-25 REGULATION)"
};

// All Authentic CBIT MCA Faculty Members (Sirs and Mams)
export const CBIT_MCA_FACULTY = [
  {
    id: "fac_indira",
    name: "Dr. B. Indira",
    title: "Mam",
    designation: "Associate Professor & Head of the Department (HoD)",
    email: "b.indira@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Data Structures, Algorithms & Machine Learning",
    assignedCourses: ["25MCC101", "25MCC111"],
    role: "faculty"
  },
  {
    id: "fac_gnr_prasad",
    name: "Dr. G. N. R. Prasad",
    title: "Sir",
    designation: "Assistant Professor & Public Relations Officer (PRO)",
    email: "gnrprasad_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Advanced Database Management Systems & Data Science",
    assignedCourses: ["25MCC103", "25MCC113"],
    role: "faculty"
  },
  {
    id: "fac_ramchander",
    name: "Dr. M. Ramchander",
    title: "Sir",
    designation: "Assistant Professor",
    email: "mramchander_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Cloud Computing, DevOps & Virtualization",
    assignedCourses: ["25MCC105", "25MCC113"],
    role: "faculty"
  },
  {
    id: "fac_krishna_prasad",
    name: "Sri P. Krishna Prasad",
    title: "Sir",
    designation: "Assistant Professor",
    email: "pkrishnaprasad_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Software Engineering, Agile Methodologies & Project Management",
    assignedCourses: ["25MCC104", "25MCC115"],
    role: "faculty"
  },
  {
    id: "fac_srinivas_kumar",
    name: "Sri B. Srinivas S. P. Kumar",
    title: "Sir",
    designation: "Assistant Professor",
    email: "srinivaskumar_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Full Stack Web Development & Microservices Architecture",
    assignedCourses: ["25MCC102", "25MCC112"],
    role: "faculty"
  },
  {
    id: "fac_rambabu",
    name: "Mr. Rambabu Potabattula",
    title: "Sir",
    designation: "Assistant Professor",
    email: "rambabu_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Mobile Application Development & Cyber Security",
    assignedCourses: ["25MCC107", "25MCC108"],
    role: "faculty"
  },
  {
    id: "fac_jayaram",
    name: "Dr. D. Jayaram",
    title: "Sir",
    designation: "Assistant Professor",
    email: "djayaram_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Distributed Systems & Machine Learning Algorithms",
    assignedCourses: ["25MCC106", "25MCC114"],
    role: "faculty"
  },
  {
    id: "fac_kavitha",
    name: "Smt. G. Kavitha",
    title: "Mam",
    designation: "Assistant Professor",
    email: "gkavitha_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Big Data Analytics & Python Deep Learning",
    assignedCourses: ["25MCC109", "25MCC114"],
    role: "faculty"
  },
  {
    id: "fac_suresh",
    name: "Dr. P. Suresh",
    title: "Sir",
    designation: "Associate Professor",
    email: "psuresh_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Natural Language Processing & Generative AI",
    assignedCourses: ["25MCC110", "25MCC115"],
    role: "faculty"
  },
  {
    id: "fac_sravanthi",
    name: "Smt. T. Sravanthi",
    title: "Mam",
    designation: "Assistant Professor",
    email: "tsravanthi_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Web Technologies & Database Administration",
    assignedCourses: ["25MCC102", "25MCC112"],
    role: "faculty"
  }
];

export const DEMO_USERS = {
  faculty: CBIT_MCA_FACULTY,
  students: [
    {
      id: "std_01",
      rollNo: "1601-25-862-001",
      email: "160125862001@cbit.org.in",
      password: "mca@2025",
      name: "A. Sai Praneeth",
      role: "student"
    },
    {
      id: "std_02",
      rollNo: "1601-25-862-002",
      email: "160125862002@cbit.org.in",
      password: "mca@2025",
      name: "B. Ananya Rao",
      role: "student"
    },
    {
      id: "std_09",
      rollNo: "1601-25-862-009",
      email: "160125862009@cbit.org.in",
      password: "mca@2025",
      name: "K. Vigneshwar",
      role: "student"
    }
  ]
};

export const BLOOMS_LEVELS = [
  { code: "L1", name: "Remembering", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { code: "L2", name: "Understanding", color: "bg-teal-100 text-teal-800 border-teal-300" },
  { code: "L3", name: "Applying", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { code: "L4", name: "Analyzing", color: "bg-amber-100 text-amber-800 border-amber-300" },
  { code: "L5", name: "Evaluating", color: "bg-orange-100 text-orange-800 border-orange-300" },
  { code: "L6", name: "Creating", color: "bg-purple-100 text-purple-800 border-purple-300" }
];

export const COURSE_OUTCOMES = [
  { id: "CO1", description: "Analyze fundamental algorithmic structures, computational complexities, and abstract data types." },
  { id: "CO2", description: "Design efficient data models and implement non-linear hierarchical structures (Trees, Graphs)." },
  { id: "CO3", description: "Apply advanced algorithmic strategies including Dynamic Programming, Greedy approaches, and Backtracking." },
  { id: "CO4", description: "Evaluate problem solving techniques using amortized analysis and randomized algorithms." },
  { id: "CO5", description: "Formulate end-to-end software solutions adhering to clean architectural design and software engineering standards." }
];

export const PROGRAM_OUTCOMES = [
  { id: "PO1", name: "Computational Knowledge" },
  { id: "PO2", name: "Problem Analysis" },
  { id: "PO3", name: "Design / Development of Solutions" },
  { id: "PO4", name: "Conduct Investigations of Complex Computing Problems" },
  { id: "PO5", name: "Modern Tool Usage (Git, Cloud, Docker)" },
  { id: "PO6", name: "Professional Ethics & Security" },
  { id: "PO7", name: "Life-long Learning & Employability" }
];

// All R25 Courses Starting with 25MCC
export const COURSES = [
  {
    code: "25MCC101",
    name: "Advanced Data Structures and Algorithms with Python",
    short: "ADSA",
    type: "Theory",
    credits: 3,
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
    code: "25MCC102",
    name: "Full Stack Web Development (MERN & Next.js)",
    short: "FSWD",
    type: "Theory",
    credits: 3,
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
    code: "25MCC103",
    name: "Advanced Database Systems & Distributed NoSQL",
    short: "ADBMS",
    type: "Theory",
    credits: 3,
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
    name: "Software Engineering & Agile DevOps Methodologies",
    short: "SE-Agile",
    type: "Theory",
    credits: 3,
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
    code: "25MCC105",
    name: "Cloud Computing & Containerization Infrastructure",
    short: "Cloud",
    type: "Theory",
    credits: 3,
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
    code: "25MCC106",
    name: "Machine Learning & Intelligent Data Systems",
    short: "ML",
    type: "Theory",
    credits: 3,
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
    code: "25MCC107",
    name: "Mobile Application Development (Flutter & Android)",
    short: "MAD",
    type: "Theory",
    credits: 3,
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
    code: "25MCC108",
    name: "Cyber Security, Cryptography & Network Defense",
    short: "CyberSec",
    type: "Theory",
    credits: 3,
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
    code: "25MCC109",
    name: "Big Data Analytics & Distributed Spark Processing",
    short: "BigData",
    type: "Theory",
    credits: 3,
    faculty: "Smt. G. Kavitha (Assistant Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Hadoop Ecosystem & HDFS Distributed File System Architecture" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "MapReduce Programming Model & Task Trackers" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "YARN Resource Manager & Cluster Scheduling" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Apache Hive QL & Partitioning Strategies" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Apache HBase Columnar Store & CRUD Operations" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "Apache Spark In-Memory Architecture & RDD Transformations" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Spark DataFrames & Spark SQL Performance Optimizations" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Real-time Stream Processing with Apache Kafka and Spark Streaming" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Spark MLlib for Distributed Machine Learning" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Data Lakehouse Architecture (Delta Lake & Apache Iceberg)" }
      ]
    }
  },
  {
    code: "25MCC110",
    name: "Natural Language Processing & Generative AI",
    short: "NLP-GenAI",
    type: "Theory",
    credits: 3,
    faculty: "Dr. P. Suresh (Associate Professor)",
    targetAttainmentThreshold: 60,
    examQuestions: {
      mid1: [
        { qNo: "Q1", maxMarks: 4, co: "CO1", bloom: "L2", title: "Text Preprocessing, Tokenization, Stemming & Lemmatization" },
        { qNo: "Q2", maxMarks: 4, co: "CO1", bloom: "L3", title: "Word Embeddings (Word2Vec, GloVe, FastText)" },
        { qNo: "Q3", maxMarks: 4, co: "CO2", bloom: "L3", title: "Part-of-Speech (POS) Tagging & Named Entity Recognition (NER)" },
        { qNo: "Q4", maxMarks: 4, co: "CO2", bloom: "L4", title: "Sequence-to-Sequence Models & Encoder-Decoder Attention" },
        { qNo: "Q5", maxMarks: 4, co: "CO3", bloom: "L4", title: "Transformer Self-Attention & Multi-Head Attention Mechanisms" }
      ],
      mid2: [
        { qNo: "Q1", maxMarks: 4, co: "CO3", bloom: "L3", title: "BERT, RoBERTa & Masked Language Modeling" },
        { qNo: "Q2", maxMarks: 4, co: "CO4", bloom: "L4", title: "Generative Pre-trained Transformers (GPT) & Autoregressive Decoding" },
        { qNo: "Q3", maxMarks: 4, co: "CO4", bloom: "L4", title: "Retrieval-Augmented Generation (RAG) Architecture & Vector DBs" },
        { qNo: "Q4", maxMarks: 4, co: "CO5", bloom: "L5", title: "Prompt Engineering, Few-Shot Learning & Fine-Tuning (LoRA)" },
        { qNo: "Q5", maxMarks: 4, co: "CO5", bloom: "L6", title: "Evaluating LLM Hallucinations & Responsible AI Safety Guardrails" }
      ]
    }
  },
  {
    code: "25MCC111",
    name: "Data Structures and Algorithms Lab",
    short: "DSA-Lab",
    type: "Practical",
    credits: 1.5,
    faculty: "Dr. B. Indira (HoD & Associate Professor)",
    rubricCriteria: [
      { id: "code_correctness", name: "Problem Solving & Test Cases", weight: 35, desc: "Passes optimal time & space constraints" },
      { id: "code_quality", name: "Data Structure Implementation Elegance", weight: 25, desc: "Proper memory pointers, modular functions" },
      { id: "viva_voce", name: "Complexity Analysis Viva", weight: 25, desc: "Proof of big-O time/space complexity" },
      { id: "record_doc", name: "Execution Observation & Record", weight: 15, desc: "Neat outputs with dry run traces" }
    ]
  },
  {
    code: "25MCC112",
    name: "Full Stack Web Development Lab",
    short: "FS-Lab",
    type: "Practical",
    credits: 1.5,
    faculty: "Sri B. Srinivas S. P. Kumar & Smt. T. Sravanthi",
    rubricCriteria: [
      { id: "code_correctness", name: "Algorithm & Code Correctness", weight: 30, desc: "Working code, passes edge tests, error handling" },
      { id: "code_quality", name: "Clean Architecture & Git Workflow", weight: 25, desc: "Modular code, commit conventions, README quality" },
      { id: "viva_voce", name: "Technical Viva Voce & Concept Defense", weight: 25, desc: "Deep conceptual answering, architectural rationale" },
      { id: "record_doc", name: "Lab Manual, Swagger / Postman Docs", weight: 20, desc: "Accurate test cases, execution screenshots, documentation" }
    ]
  },
  {
    code: "25MCC113",
    name: "Advanced Database Systems & Cloud DevOps Lab",
    short: "DB-Cloud-Lab",
    type: "Practical",
    credits: 1.5,
    faculty: "Dr. G. N. R. Prasad & Dr. M. Ramchander",
    rubricCriteria: [
      { id: "code_correctness", name: "Complex SQL / NoSQL Query Correctness", weight: 30, desc: "Proper indexing, joins, aggregate queries" },
      { id: "code_quality", name: "Docker & Cloud Deployment Quality", weight: 25, desc: "Clean Dockerfile, compose orchestration" },
      { id: "viva_voce", name: "Database Concurrency & Cloud Architecture Viva", weight: 25, desc: "ACID explanation, IAM security" },
      { id: "record_doc", name: "Observation & Query Output Screenshots", weight: 20, desc: "Complete documentation of execution outputs" }
    ]
  },
  {
    code: "25MCC114",
    name: "Machine Learning & Intelligent Systems Lab",
    short: "ML-Lab",
    type: "Practical",
    credits: 1.5,
    faculty: "Dr. D. Jayaram & Smt. G. Kavitha",
    rubricCriteria: [
      { id: "code_correctness", name: "Model Accuracy & Hyperparameter Tuning", weight: 35, desc: "Trains cleanly, prevents overfitting" },
      { id: "code_quality", name: "Feature Engineering & Data Pipeline Cleanliness", weight: 25, desc: "Pandas/NumPy modular data pipelines" },
      { id: "viva_voce", name: "Mathematical Loss Function Viva", weight: 25, desc: "Calculus behind gradient descent" },
      { id: "record_doc", name: "Model Evaluation Plots & Confusion Matrix", weight: 15, desc: "ROC curves, classification reports" }
    ]
  },
  {
    code: "25MCC115",
    name: "MCA Capstone Project & Technical Seminar",
    short: "Project-Seminar",
    type: "Practical",
    credits: 2,
    faculty: "Sri P. Krishna Prasad & Dr. P. Suresh",
    rubricCriteria: [
      { id: "code_correctness", name: "Project Implementation & Live Demo", weight: 40, desc: "End-to-end working software product" },
      { id: "code_quality", name: "System Design, GitHub Commits & Documentation", weight: 25, desc: "Clean Git commits, SRS, Swagger docs" },
      { id: "viva_voce", name: "Technical Presentation & Defense", weight: 25, desc: "Problem definition, novelty, answering viva" },
      { id: "record_doc", name: "Project Dissertation Thesis & IEEE Paper", weight: 10, desc: "Plagiarism verified report & publication draft" }
    ]
  }
];

// 60 Authentic CBIT MCA Students roster (Updated to 1601-25-862-xxx)
export const MCA_STUDENTS = [
  { rollNo: "1601-25-862-001", name: "A. Sai Praneeth", gender: "M", cgpa: 9.24, attendance: 92, github: "saipraneeth-dev", leetcode: 480, tierReady: "Tier-1 Product", primarySkill: "Full Stack (React/Node)" },
  { rollNo: "1601-25-862-002", name: "B. Ananya Rao", gender: "F", cgpa: 9.48, attendance: 96, github: "ananya-rao", leetcode: 520, tierReady: "Tier-1 Product", primarySkill: "AI & Algorithms" },
  { rollNo: "1601-25-862-003", name: "Ch. Akhil Varma", gender: "M", cgpa: 7.82, attendance: 81, github: "akhil-varma7", leetcode: 210, tierReady: "Core Product", primarySkill: "Cloud & DevOps" },
  { rollNo: "1601-25-862-004", name: "D. Divya Bharathi", gender: "F", cgpa: 8.65, attendance: 89, github: "divya-bharathi", leetcode: 340, tierReady: "Core Product", primarySkill: "Frontend / React" },
  { rollNo: "1601-25-862-005", name: "E. Mohammed Farhan", gender: "M", cgpa: 8.91, attendance: 90, github: "farhan-cse", leetcode: 410, tierReady: "Tier-1 Product", primarySkill: "Backend & Systems" },
  { rollNo: "1601-25-862-006", name: "G. Keerthana", gender: "F", cgpa: 7.42, attendance: 78, github: "keerthana-g", leetcode: 160, tierReady: "Service / Tech", primarySkill: "Java / Spring Boot" },
  { rollNo: "1601-25-862-007", name: "H. Karthik Reddy", gender: "M", cgpa: 6.95, attendance: 71, github: "karthik-reddy", leetcode: 95, tierReady: "Needs Up-skilling", primarySkill: "Database / SQL" },
  { rollNo: "1601-25-862-008", name: "J. Sravani", gender: "F", cgpa: 8.84, attendance: 88, github: "sravani-j", leetcode: 380, tierReady: "Core Product", primarySkill: "MERN Stack" },
  { rollNo: "1601-25-862-009", name: "K. Vigneshwar", gender: "M", cgpa: 6.40, attendance: 64, github: "vignesh-k", leetcode: 45, tierReady: "Critical Attention", primarySkill: "Basic Web" },
  { rollNo: "1601-25-862-010", name: "L. Sneha Latha", gender: "F", cgpa: 8.15, attendance: 84, github: "sneha-latha", leetcode: 260, tierReady: "Core Product", primarySkill: "Python / Data Eng" },
  { rollNo: "1601-25-862-011", name: "M. Rahul Naidu", gender: "M", cgpa: 8.70, attendance: 91, github: "rahul-naidu", leetcode: 350, tierReady: "Core Product", primarySkill: "Go & Microservices" },
  { rollNo: "1601-25-862-012", name: "N. Pooja Sri", gender: "F", cgpa: 7.95, attendance: 83, github: "poojasri-n", leetcode: 220, tierReady: "Core Product", primarySkill: "React / Next.js" },
  { rollNo: "1601-25-862-013", name: "P. Rakesh Kumar", gender: "M", cgpa: 7.10, attendance: 74, github: "rakesh-p", leetcode: 120, tierReady: "Service / Tech", primarySkill: "QA & Testing" },
  { rollNo: "1601-25-862-014", name: "R. Mounika", gender: "F", cgpa: 8.45, attendance: 86, github: "mounika-r", leetcode: 290, tierReady: "Core Product", primarySkill: "Data Analytics" },
  { rollNo: "1601-25-862-015", name: "S. Vamsi Krishna", gender: "M", cgpa: 9.12, attendance: 94, github: "vamsi-krishna", leetcode: 490, tierReady: "Tier-1 Product", primarySkill: "Algorithms & Systems" },
  { rollNo: "1601-25-862-016", name: "T. Bhavana", gender: "F", cgpa: 8.30, attendance: 85, github: "bhavana-t", leetcode: 275, tierReady: "Core Product", primarySkill: "UI/UX & Frontend" },
  { rollNo: "1601-25-862-017", name: "U. Tarun Tej", gender: "M", cgpa: 6.20, attendance: 61, github: "tarun-u", leetcode: 40, tierReady: "Critical Attention", primarySkill: "Core Java" },
  { rollNo: "1601-25-862-018", name: "V. Haritha", gender: "F", cgpa: 7.60, attendance: 79, github: "haritha-v", leetcode: 180, tierReady: "Service / Tech", primarySkill: "Database Admin" },
  { rollNo: "1601-25-862-019", name: "W. Rohith Sharma", gender: "M", cgpa: 8.55, attendance: 88, github: "rohith-sharma", leetcode: 320, tierReady: "Core Product", primarySkill: "Cloud & Docker" },
  { rollNo: "1601-25-862-020", name: "Y. Sushmitha", gender: "F", cgpa: 8.98, attendance: 93, github: "sushmitha-y", leetcode: 430, tierReady: "Tier-1 Product", primarySkill: "Machine Learning" },
  { rollNo: "1601-25-862-021", name: "A. Srikanth", gender: "M", cgpa: 7.30, attendance: 76, github: "srikanth-a", leetcode: 140, tierReady: "Service / Tech", primarySkill: "Web Dev" },
  { rollNo: "1601-25-862-022", name: "B. Manasa", gender: "F", cgpa: 8.40, attendance: 87, github: "manasa-b", leetcode: 280, tierReady: "Core Product", primarySkill: "Full Stack" },
  { rollNo: "1601-25-862-023", name: "C. Sandeep Goud", gender: "M", cgpa: 6.80, attendance: 68, github: "sandeep-c", leetcode: 80, tierReady: "Needs Up-skilling", primarySkill: "Networking" },
  { rollNo: "1601-25-862-024", name: "D. Pavani", gender: "F", cgpa: 9.35, attendance: 95, github: "pavani-d", leetcode: 470, tierReady: "Tier-1 Product", primarySkill: "Data Engineering" },
  { rollNo: "1601-25-862-025", name: "E. Naveen Kumar", gender: "M", cgpa: 7.50, attendance: 80, github: "naveen-e", leetcode: 190, tierReady: "Service / Tech", primarySkill: "DevOps" },
  { rollNo: "1601-25-862-026", name: "G. Swetha", gender: "F", cgpa: 8.25, attendance: 84, github: "swetha-g", leetcode: 250, tierReady: "Core Product", primarySkill: "Full Stack" },
  { rollNo: "1601-25-862-027", name: "H. Jagadeesh", gender: "M", cgpa: 7.75, attendance: 82, github: "jagadeesh-h", leetcode: 200, tierReady: "Core Product", primarySkill: "React / Node" },
  { rollNo: "1601-25-862-028", name: "K. Deepthi", gender: "F", cgpa: 8.60, attendance: 88, github: "deepthi-k", leetcode: 330, tierReady: "Core Product", primarySkill: "AI / Python" },
  { rollNo: "1601-25-862-029", name: "M. Chetan Varma", gender: "M", cgpa: 6.10, attendance: 59, github: "chetan-m", leetcode: 30, tierReady: "Critical Attention", primarySkill: "Python Basics" },
  { rollNo: "1601-25-862-030", name: "N. Meghana", gender: "F", cgpa: 9.05, attendance: 92, github: "meghana-n", leetcode: 440, tierReady: "Tier-1 Product", primarySkill: "Full Stack & Cloud" },
  { rollNo: "1601-25-862-031", name: "P. Dinesh Reddy", gender: "M", cgpa: 8.10, attendance: 85, github: "dinesh-p", leetcode: 240, tierReady: "Core Product", primarySkill: "Spring Boot" },
  { rollNo: "1601-25-862-032", name: "R. Kavya", gender: "F", cgpa: 8.75, attendance: 89, github: "kavya-r", leetcode: 360, tierReady: "Core Product", primarySkill: "React & Cloud" },
  { rollNo: "1601-25-862-033", name: "S. Bhanu Prasad", gender: "M", cgpa: 7.20, attendance: 75, github: "bhanu-s", leetcode: 130, tierReady: "Service / Tech", primarySkill: "SQL & ETL" },
  { rollNo: "1601-25-862-034", name: "T. Sindhuja", gender: "F", cgpa: 8.35, attendance: 86, github: "sindhuja-t", leetcode: 270, tierReady: "Core Product", primarySkill: "Frontend Dev" },
  { rollNo: "1601-25-862-035", name: "V. Praveen Kumar", gender: "M", cgpa: 6.70, attendance: 67, github: "praveen-v", leetcode: 75, tierReady: "Needs Up-skilling", primarySkill: "Java Basics" },
  { rollNo: "1601-25-862-036", name: "Y. Niharika", gender: "F", cgpa: 9.15, attendance: 94, github: "niharika-y", leetcode: 460, tierReady: "Tier-1 Product", primarySkill: "Algorithms & ML" },
  { rollNo: "1601-25-862-037", name: "A. Harshith", gender: "M", cgpa: 7.90, attendance: 81, github: "harshith-a", leetcode: 215, tierReady: "Core Product", primarySkill: "Node & Express" },
  { rollNo: "1601-25-862-038", name: "B. Tejaswini", gender: "F", cgpa: 8.50, attendance: 87, github: "tejaswini-b", leetcode: 310, tierReady: "Core Product", primarySkill: "Full Stack" },
  { rollNo: "1601-25-862-039", name: "C. Ajay Krishna", gender: "M", cgpa: 8.80, attendance: 90, github: "ajay-c", leetcode: 370, tierReady: "Core Product", primarySkill: "Cloud DevOps" },
  { rollNo: "1601-25-862-040", name: "D. Sireesha", gender: "F", cgpa: 7.05, attendance: 72, github: "sireesha-d", leetcode: 110, tierReady: "Service / Tech", primarySkill: "Web Design" },
  { rollNo: "1601-25-862-041", name: "E. Vineeth", gender: "M", cgpa: 6.30, attendance: 63, github: "vineeth-e", leetcode: 50, tierReady: "Critical Attention", primarySkill: "C++ Programming" },
  { rollNo: "1601-25-862-042", name: "G. Priyanka", gender: "F", cgpa: 8.90, attendance: 91, github: "priyanka-g", leetcode: 400, tierReady: "Tier-1 Product", primarySkill: "Data Science" },
  { rollNo: "1601-25-862-043", name: "K. Manoj", gender: "M", cgpa: 7.45, attendance: 77, github: "manoj-k", leetcode: 170, tierReady: "Service / Tech", primarySkill: "Database Admin" },
  { rollNo: "1601-25-862-044", name: "L. Vaishnavi", gender: "F", cgpa: 9.40, attendance: 95, github: "vaishnavi-l", leetcode: 510, tierReady: "Tier-1 Product", primarySkill: "Systems & DSA" },
  { rollNo: "1601-25-862-045", name: "M. Sai Charan", gender: "M", cgpa: 8.05, attendance: 83, github: "saicharan-m", leetcode: 235, tierReady: "Core Product", primarySkill: "Full Stack" },
  { rollNo: "1601-25-862-046", name: "N. Anitha", gender: "F", cgpa: 7.85, attendance: 82, github: "anitha-n", leetcode: 205, tierReady: "Core Product", primarySkill: "React / JS" },
  { rollNo: "1601-25-862-047", name: "P. Rithvik", gender: "M", cgpa: 8.65, attendance: 88, github: "rithvik-p", leetcode: 345, tierReady: "Core Product", primarySkill: "Cloud & Microservices" },
  { rollNo: "1601-25-862-048", name: "R. Supriya", gender: "F", cgpa: 8.20, attendance: 85, github: "supriya-r", leetcode: 255, tierReady: "Core Product", primarySkill: "Python / Django" },
  { rollNo: "1601-25-862-049", name: "S. Kalyan", gender: "M", cgpa: 6.85, attendance: 70, github: "kalyan-s", leetcode: 85, tierReady: "Needs Up-skilling", primarySkill: "Testing & QA" },
  { rollNo: "1601-25-862-050", name: "T. Lavanya", gender: "F", cgpa: 8.70, attendance: 89, github: "lavanya-t", leetcode: 355, tierReady: "Core Product", primarySkill: "Full Stack MERN" },
  { rollNo: "1601-25-862-051", name: "V. Abhishek", gender: "M", cgpa: 9.20, attendance: 93, github: "abhishek-v", leetcode: 475, tierReady: "Tier-1 Product", primarySkill: "Algorithms & C++" },
  { rollNo: "1601-25-862-052", name: "Y. Madhuri", gender: "F", cgpa: 7.65, attendance: 80, github: "madhuri-y", leetcode: 185, tierReady: "Service / Tech", primarySkill: "SQL / Analytics" },
  { rollNo: "1601-25-862-053", name: "A. Tharun", gender: "M", cgpa: 7.15, attendance: 73, github: "tharun-a", leetcode: 125, tierReady: "Service / Tech", primarySkill: "Java Dev" },
  { rollNo: "1601-25-862-054", name: "B. Shravya", gender: "F", cgpa: 8.85, attendance: 90, github: "shravya-b", leetcode: 385, tierReady: "Core Product", primarySkill: "Machine Learning" },
  { rollNo: "1601-25-862-055", name: "C. Sandeep", gender: "M", cgpa: 6.15, attendance: 60, github: "sandeep-c2", leetcode: 35, tierReady: "Critical Attention", primarySkill: "Basic Web" },
  { rollNo: "1601-25-862-056", name: "D. Pranavi", gender: "F", cgpa: 9.00, attendance: 92, github: "pranavi-d", leetcode: 420, tierReady: "Tier-1 Product", primarySkill: "DevOps & Cloud" },
  { rollNo: "1601-25-862-057", name: "E. Hemanth", gender: "M", cgpa: 8.35, attendance: 86, github: "hemanth-e", leetcode: 265, tierReady: "Core Product", primarySkill: "React / Node" },
  { rollNo: "1601-25-862-058", name: "G. Varshitha", gender: "F", cgpa: 8.55, attendance: 87, github: "varshitha-g", leetcode: 315, tierReady: "Core Product", primarySkill: "Data Science" },
  { rollNo: "1601-25-862-059", name: "K. Rohith", gender: "M", cgpa: 7.35, attendance: 76, github: "rohith-k", leetcode: 155, tierReady: "Service / Tech", primarySkill: "Full Stack" },
  { rollNo: "1601-25-862-060", name: "M. Sowmya", gender: "F", cgpa: 9.55, attendance: 97, github: "sowmya-m", leetcode: 540, tierReady: "Tier-1 Product", primarySkill: "Full Stack & Cloud AI" }
];

// Helper to calculate R25 CIE:
// Mid Average (20) + Slip Tests (15: 3 x 5M) + Assignment Average (10: (A1 + A2) / 2) = 45 Max CIE
export function calculateR25Cie(mid1Total, mid2Total, slip1, slip2, slip3, assign1, assign2) {
  const m1 = Number(mid1Total) || 0;
  const m2 = Number(mid2Total) || 0;
  const midAvg = Number(((m1 + m2) / 2).toFixed(1)); // max 20

  const s1 = Number(slip1) || 0; // max 5
  const s2 = Number(slip2) || 0; // max 5
  const s3 = Number(slip3) || 0; // max 5
  const slipTotal = s1 + s2 + s3; // max 15

  const a1 = Number(assign1) || 0; // max 10
  const a2 = Number(assign2) || 0; // max 10
  const assignAvg = Number(((a1 + a2) / 2).toFixed(1)); // max 10

  const finalCie = Math.round(midAvg + slipTotal + assignAvg); // max 45
  const maxCie = 45;
  const status = finalCie >= 18 ? "Pass" : "Remedial Needed";

  return {
    midAvg,
    slipTotal,
    assignAvg,
    finalCie,
    maxCie,
    status
  };
}

// Generate realistic initial marks compliant with R25 Syllabus for ALL 25MCC Courses
export function generateInitialMarks() {
  const marks = {};

  COURSES.forEach(course => {
    marks[course.code] = {};
    MCA_STUDENTS.forEach(student => {
      const cgpaRatio = (student.cgpa - 5.5) / 4.5; // 0.1 to 1.0

      if (course.type === "Theory") {
        const q1_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.8 + (Math.sin(student.cgpa * 2) * 0.4))));
        const q2_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.7 + (Math.cos(student.cgpa * 3) * 0.4))));
        const q3_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.9 + (Math.sin(student.cgpa * 5) * 0.3))));
        const q4_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.6 + (Math.cos(student.cgpa * 2) * 0.5))));
        const q5_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.7 + (Math.sin(student.cgpa * 4) * 0.4))));
        const mid1Total = q1_m1 + q2_m1 + q3_m1 + q4_m1 + q5_m1;

        const q1_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.9 + (Math.cos(student.cgpa * 1.5) * 0.3))));
        const q2_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.8 + (Math.sin(student.cgpa * 2.5) * 0.4))));
        const q3_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.7 + (Math.cos(student.cgpa * 4) * 0.4))));
        const q4_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.6 + (Math.sin(student.cgpa * 1.8) * 0.4))));
        const q5_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.8 + (Math.cos(student.cgpa * 3.2) * 0.3))));
        const mid2Total = q1_m2 + q2_m2 + q3_m2 + q4_m2 + q5_m2;

        const slipTest1 = Math.min(5, Math.max(1, Math.round(cgpaRatio * 4.8 + 0.2)));
        const slipTest2 = Math.min(5, Math.max(1, Math.round(cgpaRatio * 4.6 + (Math.cos(student.cgpa * 2) * 0.4))));
        const slipTest3 = Math.min(5, Math.max(1, Math.round(cgpaRatio * 4.9 + (Math.sin(student.cgpa * 3) * 0.3))));

        const assignment1 = Math.min(10, Math.max(3, Math.round(cgpaRatio * 9.4 + 0.6)));
        const assignment2 = Math.min(10, Math.max(4, Math.round(cgpaRatio * 9.6 + 0.4)));

        const r25 = calculateR25Cie(
          mid1Total,
          mid2Total,
          slipTest1,
          slipTest2,
          slipTest3,
          assignment1,
          assignment2
        );

        marks[course.code][student.rollNo] = {
          mid1: {
            Q1: q1_m1, Q2: q2_m1, Q3: q3_m1, Q4: q4_m1, Q5: q5_m1,
            total: mid1Total
          },
          mid2: {
            Q1: q1_m2, Q2: q2_m2, Q3: q3_m2, Q4: q4_m2, Q5: q5_m2,
            total: mid2Total
          },
          midAverage: r25.midAvg,
          slipTests: {
            slip1: slipTest1,
            slip2: slipTest2,
            slip3: slipTest3,
            total: r25.slipTotal
          },
          assignments: {
            assign1: assignment1,
            assign2: assignment2,
            average: r25.assignAvg
          },
          finalCie: r25.finalCie,
          maxCie: r25.maxCie,
          attendancePercentage: student.attendance,
          status: r25.status,
          evaluatedAt: "2026-11-20T10:30:00.000Z"
        };
      } else {
        // CBIT Autonomous Practical Evaluation Scheme:
        // Lab Internal 1 (20 Marks Total): Writeup (5M) + Execution (10M) + Viva (5M)
        // Lab Internal 2 (20 Marks Total): Writeup (5M) + Execution (10M) + Viva (5M)
        // Lab Internals Average = (Lab1 + Lab2) / 2 = 20 Marks Max
        // Day-to-Day Continuous Observation & Record = 30 Marks Max
        // Total Lab CIE = Lab Internals Average (20M) + Day-to-Day (30M) = 50 Marks Max
        const lab1_w = Math.min(5, Math.max(2, Math.round(cgpaRatio * 4.6 + 0.3)));
        const lab1_e = Math.min(10, Math.max(4, Math.round(cgpaRatio * 9.2 + 0.5)));
        const lab1_v = Math.min(5, Math.max(2, Math.round(cgpaRatio * 4.7 + 0.2)));
        const lab1_tot = lab1_w + lab1_e + lab1_v; // out of 20

        const lab2_w = Math.min(5, Math.max(2, Math.round(cgpaRatio * 4.8 + 0.2)));
        const lab2_e = Math.min(10, Math.max(4, Math.round(cgpaRatio * 9.4 + 0.4)));
        const lab2_v = Math.min(5, Math.max(2, Math.round(cgpaRatio * 4.6 + 0.3)));
        const lab2_tot = lab2_w + lab2_e + lab2_v; // out of 20

        const labInternalAvg = Number(((lab1_tot + lab2_tot) / 2).toFixed(1));
        const dayToDay = Math.min(30, Math.max(14, Math.round(cgpaRatio * 28 + 2)));
        const finalLabCie = Math.round(labInternalAvg + dayToDay);

        const code_correctness = Math.min(30, Math.max(12, Math.round(cgpaRatio * 28 + 2)));
        const code_quality = Math.min(25, Math.max(10, Math.round(cgpaRatio * 24 + 1)));
        const viva_voce = Math.min(25, Math.max(10, Math.round(cgpaRatio * 23 + 2)));
        const record_doc = Math.min(20, Math.max(10, Math.round(cgpaRatio * 19 + 1)));

        marks[course.code][student.rollNo] = {
          labInternal1: {
            writeup: lab1_w,
            execution: lab1_e,
            viva: lab1_v,
            total: lab1_tot // 20M Max
          },
          labInternal2: {
            writeup: lab2_w,
            execution: lab2_e,
            viva: lab2_v,
            total: lab2_tot // 20M Max
          },
          labInternalAverage: labInternalAvg, // 20M Max
          dayToDayRecord: dayToDay,           // 30M Max
          rubricScores: {
            code_correctness,
            code_quality,
            viva_voce,
            record_doc
          },
          finalCie: finalLabCie, // 50M Max
          maxCie: 50,
          gitRepoUrl: `https://github.com/${student.github}/cbit-mca-lab-2025`,
          gitCommitCount: Math.round(cgpaRatio * 45 + 10),
          status: finalLabCie >= 25 ? "Pass" : "Remedial Needed",
          evaluatedAt: "2026-11-20T14:15:00.000Z"
        };
      }
    });
  });

  return marks;
}
