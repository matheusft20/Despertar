interface Psychologist {
  id: number;
  name: string;
  specialty: string;
  description: string;
  image: string;
  video: string;
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
    video: 'https://rr3---sn-cgjxoug5a-btos.googlevideo.com/videoplayback?expire=1749636189&ei=_P9IaI3EO9XFsfIP7-W5wA8&ip=45.81.149.37&id=o-ABSH0yQE9HJDyul7D5KV60nvr3ffa4prUaz4fJhNBiV7&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AY1jyLOYgySYtHFDypozkAes8hb0csU_rvXEe-xOYcVUxDIt39ZK4qPQb0NlPP2dXyT0I6KV8OIjBEdH&vprv=1&svpuc=1&mime=video%2Fmp4&ns=1iyPojcMRYkQ7WMwyWyIv7gQ&rqh=1&gir=yes&clen=6635730&ratebypass=yes&dur=303.484&lmt=1748560880577450&lmw=1&c=TVHTML5&sefc=1&txp=5538534&n=VbN5XQI8PuOW6Q&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAKsndalJJ7rFZkRVPii8z7W_oM0BHAF7x84l-XHFhhG0AiEA7HxDuQG8R3bxxnuLEZLgwkvtFeAA8EzJAfxS3R8mF14%3D&redirect_counter=1&rm=sn-nx5zs7z&rrc=104&fexp=24351759&req_id=d18a48a9a16ea3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1749614612,&mh=oB&mip=45.239.139.210&mm=31&mn=sn-cgjxoug5a-btos&ms=au&mt=1749614212&mv=m&mvi=3&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRQIgJaS7fmLlj3h2MjiDMCbifVog5WZuybuIndRyU8chiK0CIQCuK9n8kRVAH2s0aJX_tavdfrO253vxr48ktwIaJ-UTag%3D%3D',
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