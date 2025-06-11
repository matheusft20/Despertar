interface Psychologist {
  id: number;
  name: string;
  specialty: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  badges: string[];
  detailedInfo: {
    age: number;
    experience: string;
    education: string;
    approach: string;
    patientCount: number;
    reviewCount: number;
    languages: string[];
    specializations: string[];
    crp: string;
  };
}

export const psychologists: Psychologist[] = [
  {
    id: 1,
    name: 'Dra. Daniela Rezende Dória',
    specialty: 'Psicodrama',
    description:
      '2 anos de experiência em ansiedade e depressão. Abordagem cognitivo-comportamental.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqF9gId8EF8pif5M4AlCI4ung-hJqkoafXqQ&s',
    video: 'https://www.youtube.com/watch?v=nnl_Vi_6u5c&list=RD97Rurz3ueuI&index=4',
    rating: 4.9,
    price: 109.90,
    badges: ['Online'],
    detailedInfo: {
      age: 35,
      experience: '2 anos',
      education: 'Mestrado em Psicologia Clínica - USP',
      approach: 'Psicodrama',
      patientCount: 450,
      reviewCount: 180,
      languages: ['Português'],
      specializations: ['Ansiedade', 'Depressão', 'autoestima'],
      crp:'19/5066',
    },
  },

  {
    id: 2,
    name: 'Dra. Andréa Paula',
    specialty: 'Psicodrama',
    description:
      '2 anos de experiência em ansiedade e depressão. Abordagem cognitivo-comportamental.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqF9gId8EF8pif5M4AlCI4ung-hJqkoafXqQ&s',
    rating: 4.9,
    price: 109.90,
    badges: ['Online'],
    detailedInfo: {
      age: 35,
      experience: '2 anos',
      education: 'Mestrado em Psicologia Clínica - USP',
      approach: 'TCC (Terapia Cognitiva Comportamental) e Psicologia Analítica',
      patientCount: 450,
      reviewCount: 180,
      languages: ['Português'],
      specializations: ['Ansiedade', 'Depressão', 'Relacionamentos', 'luto'],
      crp:'19/805',
    },
  },
  
];