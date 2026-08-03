export interface EducationEntry {
  degree: string;
  institution: string;
  board: string;
  score: string;
  start: string;
  end: string;
}

export const education: EducationEntry[] = [
  {
    degree: "B.Tech, Electrical Engineering",
    institution: "Academy of Technology",
    board: "West Bengal University of Technology",
    score: "CGPA 8.1",
    start: "2016",
    end: "2020",
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "Hooghly Collegiate School",
    board: "WBCHSE",
    score: "80%",
    start: "2014",
    end: "2016",
  },
  {
    degree: "Secondary (10th)",
    institution: "Hooghly Collegiate School",
    board: "WBBSE",
    score: "88%",
    start: "2012",
    end: "2014",
  },
];
