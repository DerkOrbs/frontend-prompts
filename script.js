
const roles = {
  docente_humanista: "Enseña desde una perspectiva integral, ética y reflexiva.",
  formador_ciudadania: "Promueve la deliberación democrática, el juicio ético y la participación social.",
  mediador_saberes: "Vincula el conocimiento con el entorno, promoviendo el aprendizaje situado.",
  facilitador_intercultural: "Promueve la pluralidad epistémica y el reconocimiento de saberes diversos.",
  acompanante_autonomo: "Fomenta la autorregulación, metacognición y autonomía del estudiante.",
  promotor_pensamiento: "Estimula la argumentación, el cuestionamiento y la lectura crítica del contexto.",
  disenador_experiencias: "Diseña metodologías activas, dialógicas e interdisciplinarias centradas en el estudiante.",
  tutor_investigacion: "Acompaña el desarrollo de proyectos de investigación con sentido ético y académico.",
  evaluador_aprendizaje: "Diseña instrumentos de evaluación coherentes con los aprendizajes esperados.",
  disenador_curricular: "Planifica cursos, define competencias y estructura sesiones y materiales didácticos.",
  investigador_academico: "Desarrolla estudios científicos y análisis de datos con rigurosidad.",
  coordinador_academico: "Supervisa procesos de enseñanza-aprendizaje y gestión curricular.",
  asesor_tesis: "Orienta al estudiante en redacción, revisión y mejora de trabajos académicos.",
  docente_reflexivo: "Evalúa críticamente su enseñanza para mejorar su práctica.",
  gestor_integridad: "Promueve valores éticos en la producción académica y uso de fuentes."
};

const actividades = {
  explicacion: "Enseñar o clarificar un concepto o teoría de forma clara y contextualizada.",
  diseno_metodologia: "Sugerir dinámicas y estrategias activas e interdisciplinarias.",
  planificacion_docente: "Redactar objetivos, resultados, cronogramas o secuencias didácticas.",
  evaluacion: "Generar preguntas tipo test, rúbricas, problemas o instrumentos de evaluación.",
  retroalimentacion: "Redactar comentarios personalizados orientados al pensamiento crítico.",
  estimulacion_creativa: "Proponer dilemas, proyectos o actividades innovadoras.",
  aplicacion: "Crear actividades prácticas con enfoque social, ético o ambiental.",
  analisis_critico: "Formular preguntas que fomenten reflexión y argumentación razonada.",
  investigacion: "Apoyar en preguntas de investigación, análisis de datos o métodos.",
  evaluacion_ensenanza: "Diseñar guías de autoevaluación docente o encuestas para estudiantes.",
  formacion_valores: "Generar actividades que promuevan ética, ciudadanía y discernimiento.",
  interdisciplinariedad: "Proponer proyectos con integración disciplinar o aprendizaje-servicio.",
  autonomia: "Sugerir actividades que fomenten metacognición y toma de decisiones."
};

const formatos = {
  texto_explicativo: "Generar una explicación clara y contextualizada sobre un concepto.",
  guion_exposicion: "Proporcionar estructura para una clase o exposición oral.",
  objetivos_aprendizaje: "Redactar objetivos o competencias alineadas al nivel educativo.",
  cronograma: "Sugerir una planificación semanal o secuencia de temas.",
  preguntas_evaluacion: "Generar ítems de evaluación tipo test o abiertos.",
  rubricas: "Crear criterios e indicadores para valorar tareas o presentaciones.",
  estudio_caso: "Formular escenarios para análisis o aplicación de conocimientos.",
  preguntas_criticas: "Proponer preguntas que estimulen pensamiento crítico.",
  dilema_etico: "Plantear situaciones dilemáticas para promover juicio ético.",
  actividad_creativa: "Sugerir dinámicas creativas o interdisciplinarias.",
  guia_trabajo: "Diseñar una guía paso a paso para tareas prácticas.",
  plantilla_sesion: "Proporcionar modelo de sesión estructurada.",
  marco_teorico: "Sugerir esquema conceptual o párrafos base para el marco teórico.",
  pregunta_investigacion: "Formular preguntas para proyectos de investigación.",
  diario_reflexivo: "Generar estructura para reflexionar sobre la práctica docente.",
  encuesta: "Crear encuestas o cuestionarios para retroalimentación.",
  comentario_personalizado: "Redactar observaciones orientadas a la mejora.",
  guia_autoevaluacion: "Proporcionar instrumentos para reflexión del aprendizaje.",
  proyecto_service: "Diseñar ideas de proyectos sociales vinculados a lo aprendido.",
  mapa_interdisciplinar: "Sugerir conexiones entre disciplinas para proyectos integradores."
};

const competencias = {
  pensamiento_critico: "Fortalece la argumentación, el juicio ético y la toma de decisiones informadas.",
  investigacion_incidencia: "Promueve la producción de conocimiento con impacto social.",
  liderazgo_trascendente: "Impulsa la formación de líderes comprometidos con el bien común.",
  ciudadania_global: "Fomenta la conciencia intercultural, la sostenibilidad y la responsabilidad global."
};


function setupDescripciones() {
  const campos = {
    rol: [roles, "rolDesc"],
    actividad: [actividades, "actividadDesc"],
    formato: [formatos, "formatoDesc"]
  };

  for (const id in campos) {
    const [mapa, descId] = campos[id];
    const select = document.getElementById(id);
    select.addEventListener("change", () => {
      document.getElementById(descId).textContent = mapa[select.value] || "";
    });
  }
}


async function generarPrompt(e) {
  e.preventDefault();

  const rol = document.getElementById("rol");
  const actividad = document.getElementById("actividad");
  const formato = document.getElementById("formato");
  const competencia = document.getElementById("competencia");
  const contextoInput = document.getElementById("contexto");
  const restriccionesInput = document.getElementById("restricciones");
  const loader = document.getElementById("loader");
  const resultado = document.getElementById("resultado");
  const resultadoContainer = document.getElementById("resultadoContainer");
  const btnGenerar = document.getElementById("btnGenerar");
  const btnCopiar = document.getElementById("btnCopiar");

  const rolKey = rol.value;
  const actividadKey = actividad.value;
  const formatoKey = formato.value;
  const competenciaKey = competencia.value;

  const prompt = `
Eres un generador experto de prompts educativos para inteligencia artificial, con nivel doctoral en diseño instruccional, pedagogía crítica y ciencia de datos aplicados a la educación.

Tu tarea es elaborar un prompt técnico, extenso y estructurado que será usado como input por una IA generadora de contenido educativo. Este prompt debe orientar a la IA para crear un recurso alineado a criterios pedagógicos, éticos, curriculares y sociales.

Tu respuesta debe iniciar exactamente con:
Toma el rol de ${rol.options[rol.selectedIndex].text}

Luego desarrolla el prompt incorporando estos elementos clave:

1. Rol docente: ${rol.options[rol.selectedIndex].text} (${roles[rolKey]})
2. Contexto temático: ${contextoInput.value.trim()}
3. Tipo de requerimiento: ${actividad.options[actividad.selectedIndex].text} (${actividades[actividadKey]})
4. Formato de salida: ${formato.options[formato.selectedIndex].text} (${formatos[formatoKey]})
5. Competencia general a fortalecer: ${competencia.options[competencia.selectedIndex].text} (${competencias[competenciaKey]})
6. Restricciones o criterios: ${restriccionesInput.value.trim() || "Ninguna"}

Instrucciones:
- Redacta en tono formal, técnico y riguroso.
- Usa una estructura clara, coherente y exhaustiva.
- Incluye acciones concretas, enfoques metodológicos y contexto de aplicación.
- El resultado debe reflejar la función docente, estimular pensamiento crítico y responder a finalidades educativas profundas.

No incluyas saludos, explicaciones ni comentarios. Solo devuelve el prompt estructurado, comenzando por la frase obligatoria: "Toma el rol de..." y continuando con las instrucciones.

Este mensaje será leído por un modelo avanzado de lenguaje. Asegúrate de que tu redacción sea precisa, exhaustiva y altamente profesional.
`;

  loader.classList.remove("hidden");
  resultadoContainer.classList.add("hidden");
  resultado.textContent = "";
  btnGenerar.disabled = true;
  btnCopiar.classList.add("hidden");

  try {
    const res = await fetch("https://backend-prompts.onrender.com/api/generar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    resultado.textContent = data.resultado || "Sin respuesta";
    btnCopiar.classList.remove("hidden");
  } catch (error) {
    resultado.textContent = "Error al generar el prompt.";
    console.error("Error:", error);
  } finally {
    loader.classList.add("hidden");
    resultadoContainer.classList.remove("hidden");
    btnGenerar.disabled = false;
  }
}


function copiarPrompt() {
  const resultado = document.getElementById("resultado");
  navigator.clipboard.writeText(resultado.textContent).then(() => {
    const btn = document.getElementById("btnCopiar");
    btn.textContent = "✅ Copiado";
    setTimeout(() => {
      btn.textContent = "📋";
    }, 2000);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  setupDescripciones();
  document.getElementById("promptForm").addEventListener("submit", generarPrompt);
  document.getElementById("btnCopiar").addEventListener("click", copiarPrompt);
});
