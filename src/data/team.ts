export interface TeamMember {
  name: string;
  /** Replace this path with an actual photo (e.g. /team/ehab-tawfik.jpg) to update portrait easily */
  portrait: string;
}

// Exact order and spelling as specified. Do not invent titles/degrees.
export const teamMembers: TeamMember[] = [
  { name: 'Ehab Tawfik', portrait: '/team/ehab-tawfik.png' },
  { name: 'Osama Ahmed', portrait: '/team/osama-ahmed.png' },
  { name: 'Ahmed Anis', portrait: '/team/ahmed-anis.png' },
  { name: 'Ahmed Saleh', portrait: '/team/ahmed-saleh.png' },
];

export const projectIdentity = {
  projectName: 'Autonomous Self-Healing Enterprise Network Framework',
  department: 'Information Technology',
  university: 'AGIU',
  finalStatement: 'Together, We Innovate. Together, We Build Intelligent Networks.',
};
