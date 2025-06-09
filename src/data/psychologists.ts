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
  };
}

export const psychologists: Psychologist[] = [
  {
    id: 1,
    name: 'Dra. Daniela Rezende Dória',
    specialty: 'Psicodrama',
    description:
      '8 anos de experiência em ansiedade e depressão. Abordagem cognitivo-comportamental.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqF9gId8EF8pif5M4AlCI4ung-hJqkoafXqQ&s',
    rating: 4.9,
    price: 180,
    badges: ['Online', 'Presencial'],
    detailedInfo: {
      age: 35,
      experience: '2 anos',
      education: 'Mestrado em Psicologia Clínica - USP',
      approach: 'Terapia Cognitivo-Comportamental',
      patientCount: 450,
      reviewCount: 180,
      languages: ['Português', 'Inglês'],
      specializations: ['Ansiedade', 'Depressão', 'autoestima', 'Estresse'],
    },
  },
  {
    id: 2,
    name: 'Dr. Rafael Costa',
    specialty: 'Terapia Infantil',
    description:
      'Especialista em desenvolvimento infantil e adolescentes. Atendimento lúdico.',
    image:
      'https://images.pexels.com/photos/6130739/pexels-photo-6130739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    price: 200,
    badges: ['Online', 'Primeira consulta grátis'],
    detailedInfo: {
      age: 42,
      experience: '12 anos',
      education: 'Doutorado em Psicologia do Desenvolvimento - UFRJ',
      approach: 'Terapia Lúdica e Sistêmica',
      patientCount: 620,
      reviewCount: 245,
      languages: ['Português'],
      specializations: [
        'Desenvolvimento Infantil',
        'TDAH',
        'Autismo',
        'Problemas de Aprendizagem',
      ],
    },
  },
  {
    id: 3,
    name: 'Dra. Fernanda Almeida',
    specialty: 'Relacionamentos',
    description:
      'Especialista em terapia de casal e relacionamentos interpessoais.',
    image:
      'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    price: 190,
    badges: ['Online', 'Presencial'],
    detailedInfo: {
      age: 38,
      experience: '10 anos',
      education: 'Especialização em Terapia de Casal - PUC',
      approach: 'Terapia Sistêmica',
      patientCount: 380,
      reviewCount: 156,
      languages: ['Português', 'Espanhol'],
      specializations: [
        'Terapia de Casal',
        'Relacionamentos',
        'Sexualidade',
        'Autoestima',
      ],
    },
     {
    id: 4,
    name: 'Dra. Fernanda Almeida',
    specialty: 'Relacionamentos',
    description:
      'Especialista em terapia de casal e relacionamentos interpessoais.',
    image:
      'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    price: 190,
    badges: ['Online', 'Presencial'],
    detailedInfo: {
      age: 38,
      experience: '10 anos',
      education: 'Especialização em Terapia de Casal - PUC',
      approach: 'Terapia Sistêmica',
      patientCount: 380,
      reviewCount: 156,
      languages: ['Português', 'Espanhol'],
      specializations: [
        'Terapia de Casal',
        'Relacionamentos',
        'Sexualidade',
        'Autoestima',
      ],
    },
     {
    id: 5,
    name: 'Dra. Fernanda Almeida',
    specialty: 'Relacionamentos',
    description:
      'Especialista em terapia de casal e relacionamentos interpessoais.',
    image:
      'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    price: 190,
    badges: ['Online', 'Presencial'],
    detailedInfo: {
      age: 38,
      experience: '10 anos',
      education: 'Especialização em Terapia de Casal - PUC',
      approach: 'Terapia Sistêmica',
      patientCount: 380,
      reviewCount: 156,
      languages: ['Português', 'Espanhol'],
      specializations: [
        'Terapia de Casal',
        'Relacionamentos',
        'Sexualidade',
        'Autoestima',
      ],
    },
     {
    id: 6,
    name: 'Dra. Fernanda Almeida',
    specialty: 'Relacionamentos',
    description:
      'Especialista em terapia de casal e relacionamentos interpessoais.',
    image:
      'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    price: 190,
    badges: ['Online', 'Presencial'],
    detailedInfo: {
      age: 38,
      experience: '10 anos',
      education: 'Especialização em Terapia de Casal - PUC',
      approach: 'Terapia Sistêmica',
      patientCount: 380,
      reviewCount: 156,
      languages: ['Português', 'Espanhol'],
      specializations: [
        'Terapia de Casal',
        'Relacionamentos',
        'Sexualidade',
        'Autoestima',
      ],
    },
  },
];