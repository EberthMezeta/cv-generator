const SPANISH_STOPWORDS = `
a al algo algun alguna algunas alguno algunos ante antes asi aun aunque bajo bien cada como con contra cual cuales
cuando de del desde donde dos el ella ellas ellos en entre era es esa esas ese eso esos esta estas este esto estos
fue fueron ha han hasta hay la las le les lo los mas me mi mis mucho muchos muy nada ni no nos nosotros nuestra
nuestras nuestro nuestros o otra otras otro otros para pero poco por porque que quien quienes se sea ser si sin
sobre su sus tambien tan tanto te tener tiene tienen todo todos tu tus un una unas uno unos usted ustedes y ya
debe deben puede pueden sera seran son estar estamos esten parte traves mediante segun
`

const ENGLISH_STOPWORDS = `
a about above after all also an and any are as at be been being but by can could did do does doing for from had
has have having he her here his how i if in into is it its just more most must no not of on or other our ours out
over own same she should so some such than that the their them then there these they this those through to too
under up very was we were what when where which while who whom why will with would you your yours
`

const JOB_POSTING_WORDS = `
experiencia conocimiento conocimientos ano anos empresa trabajo equipo equipos buscamos busca buscando requisito
requisitos responsabilidad responsabilidades ofrecemos ofrece deseable deseables indispensable minimo nivel puesto
vacante candidato candidata candidatos persona personas area areas funciones funcion actividades actividad manejo
capacidad habilidad habilidades excelente buen buena buenos buenas nuevo nueva nuevos nuevas sueldo salario
prestaciones horario lunes viernes oportunidad crecimiento ambiente proyecto proyectos cliente clientes ideal
perfil interesado interesados enviar cv postulate unete formar forma
experience knowledge year years company work working team teams looking seeking requirement requirements
responsibility responsibilities offer offering preferred required plus strong excellent good great new role
position candidate candidates ability abilities skill skills job opportunity growth environment project projects
client clients ideal profile join including include etc
`

function toWordSet(...wordLists: string[]): ReadonlySet<string> {
  return new Set(wordLists.flatMap((wordList) => wordList.split(/\s+/).filter(Boolean)))
}

export const STOPWORDS = toWordSet(SPANISH_STOPWORDS, ENGLISH_STOPWORDS, JOB_POSTING_WORDS)
