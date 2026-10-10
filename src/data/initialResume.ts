import type { Resume } from '../domain/entities/Resume'

export const initialResume: Resume = {
  locale: 'es',
  personal: {
    fullName: 'Ana García López',
    contacts: [
      { kind: 'phone', label: '+52 55 1234 5678' },
      { kind: 'email', label: 'ana.garcia@example.com' },
      { kind: 'linkedin', label: 'linkedin.com/in/ana-garcia', href: 'https://linkedin.com/in/ana-garcia' },
      { kind: 'github', label: 'github.com/ana-garcia', href: 'https://github.com/ana-garcia' },
    ],
  },
  sections: ['education', 'skills', 'experience', 'certifications'],
  education: [
    {
      institution: 'Universidad Nacional',
      degree: 'Licenciatura en Ingeniería de Software',
      location: 'Ciudad de México, CDMX',
      period: { start: '2017-08', end: '2021-06' },
      highlights: [
        {
          label: 'Cursos Relevantes:',
          text: 'Estructuras de Datos, Arquitectura de Software, Bases de Datos, Desarrollo Web.',
        },
      ],
    },
  ],
  skills: [
    { name: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
    { name: 'Tecnologías', items: ['React', 'Node.js', 'Express.js', 'FastAPI', 'Tailwind CSS'] },
    { name: 'Herramientas', items: ['Git', 'Docker', 'GitHub Actions', 'AWS'] },
    { name: 'Bases de Datos', items: ['PostgreSQL', 'MongoDB'] },
  ],
  experience: [
    {
      company: 'Empresa Ejemplo S.A. de C.V.',
      role: 'Desarrolladora Full Stack',
      location: 'Ciudad de México, CDMX',
      period: { start: '2022-03', end: 'present' },
      highlights: [
        'Desarrollé un panel de administración con React y TypeScript que redujo en 40% el tiempo de captura de pedidos.',
        'Diseñé una API REST con Node.js y PostgreSQL que atiende más de 50,000 solicitudes diarias.',
        'Implementé pipelines de CI/CD con GitHub Actions y Docker, reduciendo el tiempo de despliegue de horas a minutos.',
      ],
    },
    {
      company: 'Startup Demo',
      role: 'Desarrolladora Backend Jr.',
      location: 'Remoto',
      period: { start: '2021-07', end: '2022-02' },
      highlights: [
        'Construí servicios en Python con FastAPI para integrar pagos con proveedores externos.',
        'Escribí pruebas automatizadas que elevaron la cobertura del proyecto del 35% al 80%.',
      ],
    },
  ],
  certifications: [
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services (AWS)' },
    { name: 'Scrum Fundamentals Certified', issuer: 'SCRUMstudy' },
  ],
}
