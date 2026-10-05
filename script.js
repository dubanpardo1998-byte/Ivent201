/* =========================================================
   iVent™201 - JAVASCRIPT COMPLETO
   ASISTENTE TÉCNICO BIOMÉDICO
   Basado exclusivamente en la información técnica
   suministrada del Manual Técnico iVent™201
========================================================= */


/* =========================================================
   NAVEGACIÓN
========================================================= */

function showSection(sectionId, button) {

  const sections = document.querySelectorAll(".section");

  sections.forEach(function(section) {
    section.classList.remove("active-section");
  });

  const selectedSection = document.getElementById(sectionId);

  if (selectedSection) {
    selectedSection.classList.add("active-section");
  }

  const menuButtons = document.querySelectorAll(".menu-item");

  menuButtons.forEach(function(menuButton) {
    menuButton.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   ASISTENTE
========================================================= */

function askAI(question) {

  const input = document.getElementById("aiInput");
  const chat = document.getElementById("chatMessages");

  if (!chat) {
    return;
  }

  if (!question && input) {
    question = input.value.trim();
  }

  if (!question) {
    return;
  }

  /* MENSAJE DEL USUARIO */

  const userMessage = document.createElement("div");

  userMessage.className = "message user";

  userMessage.innerHTML =
    '<div class="message-text">' +
    escapeHTML(question) +
    '</div>' +
    '<div class="message-avatar">👤</div>';

  chat.appendChild(userMessage);

  if (input) {
    input.value = "";
  }

  chat.scrollTop = chat.scrollHeight;


  /* RESPUESTA */

  const answer = getAIResponse(question);

  setTimeout(function() {

    const botMessage = document.createElement("div");

    botMessage.className = "message bot";

    botMessage.innerHTML =
      '<div class="message-avatar">🤖</div>' +
      '<div class="message-text">' +
      answer +
      '</div>';

    chat.appendChild(botMessage);

    chat.scrollTop = chat.scrollHeight;

  }, 300);
}


/* =========================================================
   MOTOR DE RESPUESTAS
========================================================= */

function getAIResponse(question) {

  const q = normalizeText(question);


  /* =======================================================
     FUNCIONAMIENTO GENERAL
  ======================================================= */

  if (
    q.includes("como funciona") ||
    q.includes("funcionamiento general") ||
    q.includes("principio de funcionamiento") ||
    q.includes("como trabaja") ||
    q.includes("como opera")
  ) {

    return `
      <strong>⚙️ Funcionamiento general del iVent™201</strong><br><br>

      El iVent™201 es un ventilador pulmonar portátil
      controlado por microprocesador que genera el flujo
      respiratorio mediante una <strong>turbina centrífuga
      accionada por un motor BLDC</strong>.<br><br>

      A diferencia de un ventilador que depende de una red
      externa de aire comprimido, el iVent™201 utiliza
      <strong>aire ambiente</strong> como fuente principal
      de gas y puede incorporar oxígeno desde una fuente
      externa de alta o baja presión.<br><br>

      El funcionamiento puede resumirse así:<br><br>

      <strong>1.</strong> El aire ambiente entra por el filtro
      posterior de 0.3 µm.<br><br>

      <strong>2.</strong> El oxígeno puede ingresar mediante
      la válvula proporcional de O₂ y mezclarse con el aire
      en el manifold.<br><br>

      <strong>3.</strong> La mezcla entra a la turbina
      accionada por el motor BLDC.<br><br>

      <strong>4.</strong> La turbina aumenta o disminuye
      rápidamente sus RPM para producir el flujo y la
      presión requeridos.<br><br>

      <strong>5.</strong> La CPU recibe información de los
      sensores de presión y flujo y compara continuamente
      los valores medidos con los valores programados.<br><br>

      <strong>6.</strong> Según esa comparación, el sistema
      modifica las RPM de la turbina y la apertura de la
      válvula Dump.<br><br>

      <strong>7.</strong> Durante la inspiración se cierra
      la válvula de exhalación y el gas se dirige al paciente.<br><br>

      <strong>8.</strong> Durante la espiración la turbina
      reduce su velocidad, la válvula de exhalación permite
      la salida del gas y el sistema mantiene el PEEP mediante
      un flujo de polarización o <em>bias flow</em>.<br><br>

      Todo este proceso funciona mediante un
      <strong>control de lazo cerrado</strong>, por lo que
      el ventilador mide continuamente lo que realmente
      está ocurriendo y corrige su funcionamiento.
    `;
  }


  if (
    q.includes("que es el ivent") ||
    q.includes("que es este equipo") ||
    q.includes("que equipo es") ||
    q.includes("para que sirve el ivent")
  ) {

    return `
      <strong>🫁 iVent™201</strong><br><br>

      El iVent™201 es un ventilador pulmonar portátil,
      controlado por microprocesador y accionado por una
      turbina eléctrica interna de alta velocidad.<br><br>

      Está diseñado para proporcionar ventilación mecánica
      <strong>invasiva y no invasiva</strong> y puede utilizarse
      en pacientes pediátricos y adultos con peso igual o
      superior a <strong>10 kg</strong>.<br><br>

      Una característica importante es que no necesita una
      fuente externa de aire comprimido para generar el flujo,
      porque dispone de su propia turbina.<br><br>

      El sistema combina componentes neumáticos, electrónicos
      y de control: turbina BLDC, válvulas solenoides,
      sensores de flujo y presión, celda de O₂, tarjetas
      electrónicas y una CPU que ejecuta los algoritmos
      de ventilación y seguridad.
    `;
  }


  if (
    q.includes("fabricante") ||
    q.includes("marca") ||
    q.includes("quien fabrica")
  ) {

    return `
      <strong>🏭 Fabricante</strong><br><br>

      El equipo corresponde a <strong>GE Healthcare /
      VersaMed</strong> y pertenece a la familia
      iVent™201.<br><br>

      La referencia documental suministrada corresponde al
      Manual Técnico del ventilador GE Healthcare / VersaMed
      iVent™201.
    `;
  }


  /* =======================================================
     SECUENCIA DEL GAS
  ======================================================= */

  if (
    q.includes("recorrido del gas") ||
    q.includes("recorrido del aire") ||
    q.includes("camino del gas") ||
    q.includes("ruta del gas") ||
    q.includes("secuencia del gas")
  ) {

    return `
      <strong>💨 Recorrido del gas dentro del iVent™201</strong><br><br>

      El recorrido comienza en el aire ambiente y continúa
      por diferentes etapas neumáticas:<br><br>

      <strong>1. Aire ambiente → filtro de entrada.</strong><br>
      El aire pasa por el filtro de 0.3 µm para retener
      partículas antes de ingresar al sistema neumático.<br><br>

      <strong>2. Entrada de O₂ → válvula proporcional.</strong><br>
      Cuando se utiliza oxígeno externo, la válvula
      proporcional regula la cantidad que entra al manifold.<br><br>

      <strong>3. Cámara de mezcla.</strong><br>
      Aire y oxígeno se combinan antes de llegar a la turbina.<br><br>

      <strong>4. Turbina BLDC.</strong><br>
      El motor hace girar la turbina a alta velocidad,
      generando el flujo y presión necesarios.<br><br>

      <strong>5. Dump/Bypass y Check Valve.</strong><br>
      Una parte del flujo puede desviarse mediante la
      válvula Dump mientras el flujo principal continúa
      hacia el paciente.<br><br>

      <strong>6. Sensor de flujo interno.</strong><br>
      Permite conocer el flujo generado por el sistema.<br><br>

      <strong>7. Celda galvánica de O₂.</strong><br>
      Comprueba la concentración de oxígeno de la mezcla.<br><br>

      <strong>8. Válvula de alivio.</strong><br>
      Proporciona protección mecánica contra una
      sobrepresión excesiva.<br><br>

      <strong>9. Puerto To Patient.</strong><br>
      El gas pasa al filtro bacteriano y posteriormente
      al circuito del paciente.<br><br>

      <strong>10. Pieza Y y válvula de exhalación.</strong><br>
      El gas llega al paciente y posteriormente el gas
      exhalado es dirigido hacia la salida durante la
      fase espiratoria.
    `;
  }


  /* =======================================================
     LAZO DE CONTROL DE PRESIÓN
  ======================================================= */

  if (
    q.includes("lazo de control de presion") ||
    q.includes("control de presion") ||
    q.includes("control de presión") ||
    q.includes("pid") ||
    q.includes("como controla la presion") ||
    q.includes("como regula la presion")
  ) {

    return `
      <strong>📊 Control de presión mediante lazo cerrado</strong><br><br>

      El iVent™201 utiliza un sistema de control en lazo
      cerrado para mantener la presión de la vía aérea
      cercana al valor programado.<br><br>

      El proceso ocurre de la siguiente manera:<br><br>

      <strong>1. Medición:</strong><br>
      El sensor piezorresistivo mide la presión de la
      vía aérea y convierte esa variable en una señal
      eléctrica.<br><br>

      <strong>2. Conversión:</strong><br>
      La señal es procesada por la electrónica y enviada
      a la CPU.<br><br>

      <strong>3. Comparación:</strong><br>
      La CPU compara la presión real con el valor de
      referencia programado por el usuario.<br><br>

      <strong>4. Corrección:</strong><br>
      Si existe una diferencia entre ambos valores,
      el sistema modifica las RPM de la turbina y puede
      modular la válvula Dump.<br><br>

      <strong>5. Retroalimentación:</strong><br>
      El sensor vuelve a medir la presión y el ciclo se
      repite continuamente.<br><br>

      En términos simples, el ventilador no funciona
      solamente con una velocidad fija de turbina:
      <strong>mide → compara → corrige → vuelve a medir</strong>.
    `;
  }


  /* =======================================================
     TURBINA
  ======================================================= */

  if (
    q.includes("turbina") ||
    q.includes("motor bldc") ||
    q.includes("motor brushless") ||
    q.includes("como funciona la turbina")
  ) {

    return `
      <strong>⚙️ Turbina y motor BLDC</strong><br><br>

      La generación de flujo del iVent™201 está basada en
      una turbina centrífuga de alta velocidad accionada
      por un motor <strong>Brushless DC (BLDC)</strong>.<br><br>

      La velocidad puede variar desde aproximadamente
      <strong>3.000 RPM</strong> en condiciones basales
      hasta más de <strong>30.000 RPM</strong> durante
      determinadas demandas inspiratorias.<br><br>

      El motor es controlado electrónicamente mediante la
      tarjeta Power/Driver, que utiliza conmutación de
      potencia para controlar las fases del motor y recibe
      información de velocidad mediante sensores Hall.<br><br>

      Durante la inspiración, la turbina acelera para
      producir el flujo necesario.<br><br>

      Durante la espiración, desacelera hasta una velocidad
      basal que permite mantener el PEEP mediante el
      <strong>bias flow</strong>.<br><br>

      La turbina también trabaja coordinadamente con la
      válvula Dump. Cuando es necesario reducir rápidamente
      la presión, la turbina puede desacelerar mientras la
      válvula Dump abre una vía de escape.
    `;
  }


  /* =======================================================
     TURBINA + DUMP
  ======================================================= */

  if (
    q.includes("turbina y dump") ||
    q.includes("relacion entre la turbina") ||
    q.includes("relación entre la turbina") ||
    q.includes("turbina con la valvula dump") ||
    q.includes("turbina con la válvula dump")
  ) {

    return `
      <strong>🔄 Relación entre turbina y válvula Dump</strong><br><br>

      La turbina y la válvula Dump trabajan coordinadamente
      para controlar rápidamente la presión y el flujo.<br><br>

      La <strong>turbina</strong> controla principalmente la
      cantidad de flujo generado mediante sus RPM.<br><br>

      La <strong>válvula Dump</strong> proporciona una vía
      secundaria para liberar o desviar rápidamente parte
      del flujo hacia la atmósfera.<br><br>

      Por ejemplo, cuando termina una inspiración, el sistema
      puede reducir las RPM de la turbina y abrir la válvula
      Dump para disminuir rápidamente la presión del circuito.<br><br>

      En una condición de alta presión, esta coordinación
      permite una respuesta rápida: la turbina desacelera,
      la Dump puede abrir y la válvula de exhalación permite
      liberar el gas según corresponda.<br><br>

      Por eso no deben considerarse componentes independientes:
      forman parte del mismo sistema dinámico de regulación
      neumática.
    `;
  }


  /* =======================================================
     VALVULA DUMP
  ======================================================= */

  if (
    q.includes("valvula dump") ||
    q.includes("válvula dump") ||
    q.includes("dump bypass") ||
    q.includes("bypass")
  ) {

    return `
      <strong>🔄 Válvula Dump / Bypass</strong><br><br>

      La válvula Dump/Bypass es una electroválvula ubicada
      a la salida de la turbina.<br><br>

      Su función principal es proporcionar una vía rápida
      para desviar o liberar flujo hacia un silenciador
      de escape.<br><br>

      Puede actuar durante:<br><br>

      • Transiciones entre inspiración y espiración.<br>
      • Eventos de alta presión.<br>
      • Condiciones de falla.<br>
      • Apagado del sistema.<br><br>

      <strong>Si queda abierta:</strong><br>
      parte importante del flujo se escapa y el ventilador
      puede no alcanzar la presión o volumen programados,
      generando una condición de baja presión.<br><br>

      <strong>Si queda cerrada:</strong><br>
      el sistema pierde capacidad para liberar rápidamente
      el flujo, dificultando la reducción de presión.<br><br>

      Su funcionamiento puede verificarse mediante OVT,
      VVT y las funciones disponibles en el menú técnico.
    `;
  }


  /* =======================================================
     VALVULA DE EXHALACIÓN
  ======================================================= */

  if (
    q.includes("valvula de exhalacion") ||
    q.includes("válvula de exhalación") ||
    q.includes("como funciona la valvula de exhalacion") ||
    q.includes("como funciona la válvula de exhalación")
  ) {

    return `
      <strong>🔄 Válvula de exhalación</strong><br><br>

      La válvula de exhalación utiliza una membrana o
      diafragma controlado neumáticamente.<br><br>

      <strong>Durante la inspiración:</strong><br>
      la CPU ordena aplicar presión de pilotaje a la línea
      neumática de control. Esta presión mantiene la
      membrana cerrada para que el gas se dirija hacia
      el paciente.<br><br>

      <strong>Durante la espiración:</strong><br>
      se reduce la presión de control y la membrana permite
      que el gas exhalado salga hacia la atmósfera.<br><br>

      Además, durante la espiración la presión de control
      puede regularse para ayudar a mantener el
      <strong>PEEP programado</strong>.<br><br>

      <strong>Falla abierta:</strong> el equipo puede perder
      presión y generar Low Pressure o Disconnect.<br><br>

      <strong>Falla cerrada:</strong> el gas no puede liberarse
      adecuadamente y puede aparecer una condición de
      High Pressure.
    `;
  }


  /* =======================================================
     PEEP
  ======================================================= */

  if (
    q.includes("peep") ||
    q.includes("como mantiene el peep") ||
    q.includes("como funciona el peep") ||
    q.includes("peep activo")
  ) {

    return `
      <strong>🫧 PEEP activo</strong><br><br>

      El iVent™201 utiliza un sistema de PEEP activo.
      Esto significa que la turbina no se detiene
      completamente durante la espiración.<br><br>

      En lugar de detenerse, la turbina mantiene una
      velocidad basal calculada para producir un
      <strong>flujo de polarización o bias flow</strong>.<br><br>

      Ese flujo contribuye a mantener la presión del circuito
      contra la membrana de la válvula de exhalación.<br><br>

      El sistema controla esta condición mediante la
      interacción de:<br><br>

      • Turbina BLDC.<br>
      • Sensor de presión.<br>
      • CPU.<br>
      • Línea neumática de control de exhalación.<br>
      • Válvula de exhalación.<br><br>

      El rango de PEEP/CPAP indicado es de
      <strong>0 a 40 cmH₂O</strong>.<br><br>

      Por eso el PEEP no depende únicamente de una válvula
      mecánica: existe un control activo de la presión
      mediante el sistema electrónico y neumático.
    `;
  }


  /* =======================================================
     FLUJO
  ======================================================= */

  if (
    q.includes("control de flujo") ||
    q.includes("como controla el flujo") ||
    q.includes("como mide el flujo") ||
    q.includes("sensor de flujo interno")
  ) {

    return `
      <strong>💨 Control y medición del flujo</strong><br><br>

      El sistema utiliza principalmente dos puntos de
      medición de flujo.<br><br>

      <strong>Sensor interno:</strong><br>
      mide el flujo generado por el sistema neumático
      después de la turbina y participa en el control
      de la mezcla de oxígeno.<br><br>

      <strong>Sensor distal en la pieza Y:</strong><br>
      mide el flujo real que entra y sale del paciente.
      Su funcionamiento está basado en una diferencia
      de presión producida por el paso del gas a través
      de un elemento restrictivo.<br><br>

      La CPU utiliza esta información para determinar
      volumen corriente, detectar esfuerzos del paciente,
      generar alarmas y evaluar el comportamiento del
      circuito.<br><br>

      Por lo tanto, el sensor interno y el sensor distal
      cumplen funciones diferentes pero complementarias.
    `;
  }


  /* =======================================================
     SENSOR Y
  ======================================================= */

  if (
    q.includes("sensor y") ||
    q.includes("sensor distal") ||
    q.includes("pieza y") ||
    q.includes("sensor de flujo distal")
  ) {

    return `
      <strong>📡 Sensor de flujo distal de la pieza Y</strong><br><br>

      El sensor distal está ubicado cerca del paciente,
      en la pieza Y del circuito.<br><br>

      Su función es medir el flujo real que entra y sale
      del paciente mediante una medición de presión
      diferencial.<br><br>

      La señal neumática llega a los sensores mediante
      dos líneas de silicona asociadas al sistema
      <strong>Zero/Purge</strong>.<br><br>

      La CPU utiliza esta información para:<br><br>

      • Calcular volumen corriente.<br>
      • Detectar el esfuerzo inspiratorio.<br>
      • Detectar condiciones de desconexión.<br>
      • Generar alarmas de volumen minuto.<br>
      • Supervisar la ventilación real del paciente.<br><br>

      Un problema frecuente puede ser la presencia de
      <strong>condensación de agua</strong> en las líneas.
      Esto puede producir lecturas erráticas, Flow Sensor
      Error o Sensor Fail.<br><br>

      La revisión debe incluir las líneas neumáticas,
      humedad, fisuras, conexiones y funcionamiento
      del sistema Zero/Purge.
    `;
  }


  /* =======================================================
     ZERO PURGE
  ======================================================= */

  if (
    q.includes("zero purge") ||
    q.includes("zero/purge") ||
    q.includes("como funciona zero") ||
    q.includes("como funciona el zero")
  ) {

    return `
      <strong>🔄 Sistema Zero/Purge</strong><br><br>

      El sistema Zero/Purge es un conjunto neumático y
      electrónico utilizado principalmente para mantener
      la confiabilidad de las mediciones del sensor distal.<br><br>

      Tiene dos funciones principales:<br><br>

      <strong>1. Auto-Zero:</strong><br>
      conecta temporalmente las entradas del sistema de
      medición a la presión atmosférica para corregir
      el desplazamiento u offset del sensor.<br><br>

      <strong>2. Purga:</strong><br>
      introduce impulsos de aire limpio por las líneas
      neumáticas para ayudar a expulsar agua o condensación.<br><br>

      Esto es importante porque las líneas del sensor Y
      transportan señales neumáticas muy pequeñas. La
      presencia de agua puede modificar la señal y producir
      errores de medición.<br><br>

      Una falla del sistema puede generar lecturas erráticas
      y alarmas como <strong>Flow Sensor Error</strong> o
      <strong>Sensor Fail</strong>.
    `;
  }


  /* =======================================================
     VOLUMEN CORRIENTE
  ======================================================= */

  if (
    q.includes("volumen corriente") ||
    q.includes("como calcula el vt") ||
    q.includes("como calcula el volumen") ||
    q.includes("calculo del vt") ||
    q.includes("calculo del volumen")
  ) {

    return `
      <strong>📐 Cálculo del volumen corriente</strong><br><br>

      El ventilador obtiene el volumen corriente a partir
      del flujo medido por el sensor distal de la pieza Y.<br><br>

      La CPU realiza una integración del flujo respecto
      al tiempo para determinar cuánto volumen de gas
      ha sido entregado.<br><br>

      Conceptualmente:<br><br>

      <strong>Volumen = integración del flujo a lo largo
      del tiempo.</strong><br><br>

      En los modos volumétricos, la CPU acumula continuamente
      ese volumen durante la inspiración.<br><br>

      Cuando el volumen acumulado alcanza el valor de VT
      programado, el ventilador termina la inspiración y
      cambia a la fase espiratoria.<br><br>

      El rango configurable indicado es de
      <strong>50 a 2000 mL</strong>.<br><br>

      Las fugas pueden provocar diferencias entre el volumen
      entregado y el volumen que retorna durante la
      espiración, por lo que el equipo utiliza algoritmos
      de compensación de fugas.
    `;
  }


  /* =======================================================
     FiO2
  ======================================================= */

  if (
    q.includes("fio2") ||
    q.includes("fi o2") ||
    q.includes("control de oxigeno") ||
    q.includes("control de oxígeno") ||
    q.includes("como controla el oxigeno") ||
    q.includes("como controla el oxígeno")
  ) {

    return `
      <strong>🧪 Control de FiO₂</strong><br><br>

      El iVent™201 puede trabajar con una concentración
      de oxígeno entre <strong>21 % y 100 %</strong>.<br><br>

      El control se realiza mediante una combinación
      de medición de flujo, válvula proporcional y
      celda galvánica de oxígeno.<br><br>

      <strong>1.</strong> El sensor de flujo interno determina
      el flujo de gas generado.<br><br>

      <strong>2.</strong> La CPU utiliza esa información para
      calcular cuánto oxígeno necesita incorporarse.<br><br>

      <strong>3.</strong> La tarjeta Power/Driver genera la
      señal PWM para la válvula proporcional de O₂.<br><br>

      <strong>4.</strong> La válvula regula la cantidad de
      oxígeno de alta presión que entra al manifold.<br><br>

      <strong>5.</strong> La celda galvánica mide la concentración
      real de oxígeno y permite verificar el resultado.<br><br>

      Por lo tanto, el sistema funciona como otro lazo
      de control: <strong>medir → calcular → dosificar →
      verificar → corregir</strong>.
    `;
  }


  /* =======================================================
     CELDA DE OXIGENO
  ======================================================= */

  if (
    q.includes("celda galvanica") ||
    q.includes("celda galvánica") ||
    q.includes("celda de oxigeno") ||
    q.includes("celda de oxígeno")
  ) {

    return `
      <strong>🧪 Celda galvánica de oxígeno</strong><br><br>

      La celda galvánica es un sensor electroquímico
      utilizado para medir la concentración de oxígeno
      presente en el gas entregado.<br><br>

      Según la información suministrada, está formada
      por un ánodo de plomo, un cátodo de oro y un
      electrolito basado en KOH.<br><br>

      Cuando el oxígeno entra en contacto con la celda,
      se produce una reacción electroquímica que genera
      una señal eléctrica relacionada con la presión
      parcial de oxígeno.<br><br>

      La CPU utiliza esta señal para conocer la FiO₂ real.<br><br>

      La calibración utiliza dos puntos:<br><br>

      <strong>• Aire ambiente:</strong> aproximadamente 21 % O₂.<br>
      <strong>• Oxígeno puro:</strong> aproximadamente 100 % O₂.<br><br>

      El sistema utiliza estos dos puntos para establecer
      la relación entre la señal eléctrica y la concentración
      de oxígeno.
    `;
  }


  /* =======================================================
     CALIBRACION DE OXIGENO
  ======================================================= */

  if (
    q.includes("calibracion de oxigeno") ||
    q.includes("calibración de oxígeno") ||
    q.includes("calibrar oxigeno") ||
    q.includes("calibrar oxígeno") ||
    q.includes("calibracion fio2")
  ) {

    return `
      <strong>🛠️ Calibración de O₂</strong><br><br>

      La calibración de la celda de oxígeno utiliza dos
      puntos de referencia.<br><br>

      <strong>Punto 1 — Aire ambiente:</strong><br>
      El sensor se expone a una concentración conocida
      de aproximadamente <strong>21 % de O₂</strong>.<br><br>

      <strong>Punto 2 — Oxígeno puro:</strong><br>
      Se suministra oxígeno medicinal de alta presión,
      aproximadamente 100 % O₂.<br><br>

      Con ambos puntos la CPU determina la relación entre
      la señal generada por la celda y la concentración
      de oxígeno.<br><br>

      En servicio técnico, la calibración se realiza desde
      el menú correspondiente y requiere una fuente de
      oxígeno adecuada y condiciones controladas.<br><br>

      Una celda agotada o una fuente de O₂ incorrecta puede
      producir errores de calibración y alarmas High/Low FiO₂.
    `;
  }


  /* =======================================================
     MODOS DE VENTILACIÓN
  ======================================================= */

  if (
    q.includes("modos de ventilacion") ||
    q.includes("modos de ventilación") ||
    q.includes("que modos tiene") ||
    q.includes("modos disponibles")
  ) {

    return `
      <strong>🫁 Modos de ventilación</strong><br><br>

      El iVent™201 dispone de varios modos destinados
      a diferentes estrategias de soporte ventilatorio.<br><br>

      <strong>1. A/C Volume:</strong><br>
      controla principalmente el volumen corriente. El
      ventilador garantiza el VT programado y el paciente
      puede disparar respiraciones adicionales.<br><br>

      <strong>2. A/C Pressure:</strong><br>
      controla la presión inspiratoria. El flujo puede
      variar dependiendo de la mecánica pulmonar y el
      ventilador cicla por tiempo.<br><br>

      <strong>3. SIMV Volume / Pressure:</strong><br>
      combina respiraciones mandatarias sincronizadas
      con respiraciones espontáneas. Las respiraciones
      espontáneas pueden recibir presión de soporte.<br><br>

      <strong>4. CPAP/PSV:</strong><br>
      está orientado a pacientes que realizan respiración
      espontánea. El ventilador mantiene presión positiva
      y puede proporcionar presión de soporte.<br><br>

      <strong>5. Adaptive Bi-Level:</strong><br>
      utiliza dos niveles de presión y permite respiración
      espontánea durante ambos niveles.
    `;
  }


  /* =======================================================
     A/C VOLUMEN VS PRESION
  ======================================================= */

  if (
    q.includes("a/c volumen") ||
    q.includes("ac volumen") ||
    q.includes("a/c presion") ||
    q.includes("a/c presión") ||
    q.includes("diferencia entre volumen y presion") ||
    q.includes("diferencia entre volumen y presión")
  ) {

    return `
      <strong>📊 A/C Volumen vs A/C Presión</strong><br><br>

      <strong>A/C Volume:</strong><br>
      La variable principal controlada es el
      <strong>volumen corriente</strong>.<br><br>

      La CPU integra el flujo medido durante la inspiración.
      Cuando alcanza el VT programado, finaliza la inspiración.<br><br>

      <strong>A/C Pressure:</strong><br>
      La variable principal controlada es la
      <strong>presión inspiratoria</strong>.<br><br>

      El ventilador intenta mantener la presión programada
      durante el tiempo inspiratorio establecido. El flujo
      puede cambiar según las condiciones mecánicas del
      sistema respiratorio.<br><br>

      La diferencia fundamental es:<br><br>

      <strong>A/C Volume → controla cuánto volumen se entrega.</strong><br>
      <strong>A/C Pressure → controla a qué presión se entrega.</strong>
    `;
  }


  /* =======================================================
     SIMV
  ======================================================= */

  if (
    q.includes("simv") ||
    q.includes("como funciona simv")
  ) {

    return `
      <strong>🫁 SIMV</strong><br><br>

      SIMV combina respiraciones mandatorias sincronizadas
      con períodos en los que el paciente puede respirar
      espontáneamente.<br><br>

      Las respiraciones obligatorias son controladas por
      el ventilador y pueden ser de volumen o presión,
      dependiendo de la configuración.<br><br>

      Entre las respiraciones mandatorias el paciente puede
      realizar respiraciones espontáneas.<br><br>

      Estas respiraciones espontáneas pueden recibir
      <strong>Presión de Soporte (PSV)</strong> cuando
      corresponde.<br><br>

      Esto permite combinar soporte obligatorio con
      participación activa del paciente.
    `;
  }


  /* =======================================================
     CPAP PSV
  ======================================================= */

  if (
    q.includes("cpap") ||
    q.includes("psv") ||
    q.includes("cpap psv")
  ) {

    return `
      <strong>🫁 CPAP / PSV</strong><br><br>

      Este modo está orientado principalmente a pacientes
      que mantienen respiración espontánea.<br><br>

      El paciente determina principalmente la frecuencia,
      el inicio de la inspiración y el comportamiento
      del flujo.<br><br>

      El ventilador mantiene una presión positiva de base
      mediante PEEP/CPAP y puede proporcionar una presión
      adicional durante la inspiración denominada
      <strong>Pressure Support</strong>.<br><br>

      El modo también dispone de una función de
      <strong>Apnea Backup</strong> para responder ante
      ausencia de respiración espontánea durante el
      intervalo configurado.
    `;
  }


  /* =======================================================
     TRIGGER
  ======================================================= */

  if (
    q.includes("trigger") ||
    q.includes("disparo") ||
    q.includes("como detecta el paciente") ||
    q.includes("detecta el esfuerzo")
  ) {

    return `
      <strong>🎯 Detección del esfuerzo del paciente</strong><br><br>

      El iVent™201 puede detectar el esfuerzo inspiratorio
      mediante dos mecanismos principales:<br><br>

      <strong>Trig-Flow:</strong><br>
      el ventilador mantiene un flujo de polarización
      durante la espiración. Cuando el paciente inicia
      una inspiración, modifica el flujo medido y, si la
      variación supera la sensibilidad configurada,
      se inicia una respiración.<br><br>

      Rango indicado:
      <strong>1–20 L/min</strong>.<br><br>

      <strong>Trig-Press:</strong><br>
      el sistema detecta una caída de presión por debajo
      del PEEP. Si la caída supera la sensibilidad
      seleccionada, se interpreta como esfuerzo del paciente.<br><br>

      Rango indicado:
      <strong>-0.5 a -20 cmH₂O</strong>.<br><br>

      Ambos mecanismos permiten que el ventilador responda
      a la respiración espontánea del paciente.
    `;
  }


  /* =======================================================
     AUTO TRIGGER
  ======================================================= */

  if (
    q.includes("auto trigger") ||
    q.includes("auto-trigger") ||
    q.includes("disparo falso") ||
    q.includes("disparos falsos")
  ) {

    return `
      <strong>⚠️ Auto-trigger</strong><br><br>

      El auto-trigger ocurre cuando el ventilador interpreta
      una variación del circuito como si fuera un esfuerzo
      inspiratorio real del paciente.<br><br>

      Puede favorecerse por:<br><br>

      • Fugas en el circuito.<br>
      • Condensación en las líneas del sensor.<br>
      • Oscilaciones neumáticas.<br>
      • Problemas de compensación de fugas.<br><br>

      El sistema intenta reducir este problema mediante
      compensación de fugas y procesamiento de las señales
      de flujo y presión.<br><br>

      Una fuga importante puede modificar el flujo basal,
      haciendo que la señal se parezca a un esfuerzo
      inspiratorio.
    `;
  }


  /* =======================================================
     COMPENSACION DE FUGAS
  ======================================================= */

  if (
    q.includes("compensacion de fugas") ||
    q.includes("compensación de fugas") ||
    q.includes("como compensa las fugas") ||
    q.includes("fugas de 60")
  ) {

    return `
      <strong>💨 Compensación de fugas</strong><br><br>

      El iVent™201 compara continuamente información del
      flujo generado por el sistema con el flujo medido
      cerca del paciente.<br><br>

      La diferencia permite estimar una fuga del circuito.<br><br>

      Cuando el sistema detecta una fuga, puede aumentar
      el flujo generado para compensarla y ayudar a mantener
      el PEEP programado.<br><br>

      La información suministrada indica una capacidad de
      compensación de fugas de hasta aproximadamente
      <strong>60 L/min</strong>.<br><br>

      Esta función también ayuda a reducir el riesgo de
      auto-trigger provocado por pérdidas de flujo.<br><br>

      Sin embargo, una fuga física importante siempre debe
      investigarse: manguito endotraqueal, conexiones,
      trampa de agua, pieza Y y válvula de exhalación.
    `;
  }


  /* =======================================================
     ALARMAS
  ======================================================= */

  if (
    q.includes("alarmas") ||
    q.includes("sistema de alarmas") ||
    q === "alarma"
  ) {

    return `
      <strong>🚨 Sistema de alarmas</strong><br><br>

      El iVent™201 supervisa continuamente variables
      relacionadas con paciente, circuito, sensores,
      oxígeno, alimentación y funcionamiento interno.<br><br>

      Entre las principales alarmas están:<br><br>

      🔴 <strong>High Pressure</strong><br>
      Presión de vía aérea superior al límite configurado.<br><br>

      🔴 <strong>Low Pressure</strong><br>
      La presión alcanzada es inferior a la esperada.<br><br>

      🔴 <strong>Apnea</strong><br>
      No se detecta esfuerzo o respiración dentro del
      intervalo establecido.<br><br>

      🔴 <strong>Patient Disconnect</strong><br>
      El sistema detecta condiciones compatibles con
      desconexión.<br><br>

      🔴 <strong>Low Minute Volume</strong><br>
      El volumen minuto cae por debajo del límite configurado.<br><br>

      🔴 <strong>High/Low FiO₂</strong><br>
      La concentración medida se desvía del valor seleccionado.<br><br>

      🔴 <strong>Low/Empty Battery</strong><br>
      La reserva de energía está próxima a agotarse.<br><br>

      🔴 <strong>Sensor Fail / Flow Sensor Error</strong><br>
      Existe un problema con la medición de flujo o
      sus líneas neumáticas.<br><br>

      🔴 <strong>Blower Fail / Over-Temperature</strong><br>
      Existe una condición anormal de la turbina o
      su temperatura.
    `;
  }


  /* =======================================================
     HIGH PRESSURE
  ======================================================= */

  if (
    q.includes("alta presion") ||
    q.includes("alta presión") ||
    q.includes("high pressure")
  ) {

    return `
      <strong>🚨 Alarma High Pressure</strong><br><br>

      Esta alarma aparece cuando la presión de la vía
      aérea supera el límite configurado.<br><br>

      Las causas pueden encontrarse en el paciente,
      circuito o equipo.<br><br>

      <strong>Paciente:</strong><br>
      • Tos.<br>
      • Secreciones.<br>
      • Broncoespasmo.<br>
      • Mordedura del tubo endotraqueal.<br><br>

      <strong>Circuito:</strong><br>
      • Manguera doblada.<br>
      • Obstrucción.<br>
      • Problema en la válvula de exhalación.<br><br>

      <strong>Equipo:</strong><br>
      • Sensor de presión incorrecto.<br>
      • Problema de control neumático.<br>
      • Válvula Dump con problema.<br><br>

      Desde el punto de vista biomédico, si la condición
      persiste utilizando un pulmón de prueba, se debe
      revisar el circuito, válvula de exhalación, sistema
      Dump y calibración del sensor de presión.<br><br>

      <strong>Importante:</strong> ante una alarma de alta
      presión en un paciente real, la prioridad es la
      seguridad del paciente y seguir el protocolo clínico.
    `;
  }


  /* =======================================================
     LOW PRESSURE
  ======================================================= */

  if (
    q.includes("baja presion") ||
    q.includes("baja presión") ||
    q.includes("low pressure")
  ) {

    return `
      <strong>⚠️ Alarma Low Pressure</strong><br><br>

      Indica que el sistema no está alcanzando la presión
      esperada durante la inspiración.<br><br>

      Posibles causas:<br><br>

      • Desconexión del circuito.<br>
      • Fugas importantes.<br>
      • Manguito endotraqueal con pérdida.<br>
      • Trampa de agua con fuga.<br>
      • Válvula Dump trabada abierta.<br>
      • Problemas en el sensor de presión.<br><br>

      Para diagnóstico biomédico se puede comprobar la
      estanqueidad del circuito y posteriormente utilizar
      OVT/VVT para determinar si el problema pertenece al
      sistema neumático o electrónico.
    `;
  }


  /* =======================================================
     APNEA
  ======================================================= */

  if (
    q.includes("apnea") ||
    q.includes("alarma de apnea")
  ) {

    return `
      <strong>🚨 Alarma de Apnea</strong><br><br>

      Se genera cuando el ventilador no detecta una
      respiración o esfuerzo del paciente durante el
      intervalo de apnea configurado.<br><br>

      El rango indicado para este parámetro es de
      <strong>10 a 60 segundos</strong>.<br><br>

      Cuando se activa, el sistema puede iniciar
      automáticamente una estrategia de
      <strong>Apnea Backup</strong> para mantener soporte
      ventilatorio.<br><br>

      La condición puede relacionarse con ausencia real
      de esfuerzo del paciente o con problemas en la
      detección de flujo/presión.
    `;
  }


  /* =======================================================
     DESCONEXION
  ======================================================= */

  if (
    q.includes("desconexion") ||
    q.includes("desconexión") ||
    q.includes("patient disconnect")
  ) {

    return `
      <strong>🔌 Patient Disconnect</strong><br><br>

      Esta alarma indica que el ventilador detecta
      condiciones compatibles con desconexión del
      paciente o una fuga importante.<br><br>

      El sistema puede identificar una combinación de
      ausencia de flujo de retorno y caída de presión.<br><br>

      Se deben revisar:<br><br>

      • Conexiones del circuito.<br>
      • Pieza Y.<br>
      • Tubo endotraqueal cuando corresponda.<br>
      • Mangueras.<br>
      • Trampas de agua.<br>
      • Líneas de sensores.<br><br>

      En una situación clínica, la prioridad es restablecer
      la ventilación siguiendo el protocolo correspondiente.
    `;
  }


  /* =======================================================
     SENSOR ERROR
  ======================================================= */

  if (
    q.includes("flow sensor error") ||
    q.includes("sensor fail") ||
    q.includes("error de sensor") ||
    q.includes("error del sensor") ||
    q.includes("error sensor flujo")
  ) {

    return `
      <strong>🔧 Flow Sensor Error / Sensor Fail</strong><br><br>

      Este tipo de alarma puede estar relacionada con
      el sensor de flujo distal, sus líneas neumáticas
      o el sistema Zero/Purge.<br><br>

      Las causas posibles incluyen:<br><br>

      • Condensación de agua.<br>
      • Líneas desconectadas.<br>
      • Líneas obstruidas.<br>
      • Fisuras en los tubos.<br>
      • Sensor deteriorado.<br>
      • Problemas del sistema Zero/Purge.<br><br>

      <strong>Diagnóstico biomédico:</strong><br><br>

      1. Inspeccionar las líneas de silicona.<br>
      2. Buscar gotas de agua o condensación.<br>
      3. Verificar conexiones.<br>
      4. Revisar el sistema Zero/Purge.<br>
      5. Probar con otro sensor Y si corresponde.<br>
      6. Ejecutar OVT.<br>
      7. Realizar calibración de flujo si es necesario.
    `;
  }


  /* =======================================================
     FiO2 ALARMA
  ======================================================= */

  if (
    q.includes("alarma fio2") ||
    q.includes("alarma de oxigeno") ||
    q.includes("alarma de oxígeno") ||
    q.includes("fio2 alta") ||
    q.includes("fio2 baja")
  ) {

    return `
      <strong>💨 Alarma High/Low FiO₂</strong><br><br>

      La alarma se genera cuando la concentración de
      oxígeno medida se desvía significativamente del
      valor seleccionado.<br><br>

      La información suministrada indica un límite
      aproximado de <strong>±7 %</strong> respecto al
      valor configurado.<br><br>

      Posibles causas:<br><br>

      • Fuente de O₂ incorrecta.<br>
      • Presión de suministro fuera de rango.<br>
      • Celda galvánica agotada.<br>
      • Válvula proporcional defectuosa.<br>
      • Problema de calibración.<br><br>

      Para diagnóstico biomédico se debe verificar primero
      el suministro de O₂ y posteriormente la celda,
      válvula proporcional y calibración.
    `;
  }


  /* =======================================================
     BATERIA
  ======================================================= */

  if (
    q.includes("bateria") ||
    q.includes("batería") ||
    q.includes("autonomia") ||
    q.includes("autonomía")
  ) {

    return `
      <strong>🔋 Sistema de batería</strong><br><br>

      Dependiendo de la versión del equipo puede utilizar
      una batería de plomo-ácido sellada de 12 V o un
      sistema de alta capacidad basado en baterías Li-Ion.<br><br>

      La autonomía indicada es aproximadamente:<br><br>

      <strong>• Batería estándar SLA:</strong> hasta 2 horas.<br>
      <strong>• Sistema de alta capacidad:</strong> hasta 4 horas.<br><br>

      El tiempo de carga indicado puede estar entre
      <strong>3 y 8 horas</strong> dependiendo de las
      condiciones y versión.<br><br>

      Cuando queda poca autonomía aparece una alarma
      de batería baja. Si la batería se agota, el equipo
      puede entrar en condición de apagado controlado.<br><br>

      Ante pérdida de AC, la tarjeta Power/Driver realiza
      la transición hacia la batería.
    `;
  }


  /* =======================================================
     PERDIDA AC
  ======================================================= */

  if (
    q.includes("perdida ac") ||
    q.includes("pérdida ac") ||
    q.includes("falla ac") ||
    q.includes("fallo ac") ||
    q.includes("que pasa si se va la luz")
  ) {

    return `
      <strong>⚡ Pérdida de alimentación AC</strong><br><br>

      Cuando se interrumpe la alimentación de red,
      el sistema de alimentación puede realizar una
      conmutación automática hacia la batería interna.<br><br>

      La tarjeta Power/Driver administra las diferentes
      fuentes disponibles: AC, DC externa y batería.<br><br>

      Para diagnóstico se deben revisar:<br><br>

      • Tomacorriente.<br>
      • Cable de alimentación.<br>
      • Fusibles de entrada.<br>
      • Fuente interna.<br>
      • Estado de batería.<br>
      • Tarjeta Power/Driver.<br><br>

      Esta transición es importante porque permite mantener
      la ventilación cuando se pierde temporalmente la
      alimentación de red.
    `;
  }


  /* =======================================================
     POWER DRIVER
  ======================================================= */

  if (
    q.includes("power driver") ||
    q.includes("power/driver") ||
    q.includes("tarjeta power") ||
    q.includes("tarjeta de potencia")
  ) {

    return `
      <strong>⚡ Tarjeta Power/Driver</strong><br><br>

      La tarjeta Power/Driver es una de las principales
      tarjetas electrónicas del ventilador.<br><br>

      Sus funciones incluyen:<br><br>

      • Gestión de entrada AC.<br>
      • Gestión de entrada DC externa.<br>
      • Gestión de batería.<br>
      • Carga de batería.<br>
      • Conversión y regulación DC-DC.<br>
      • Generación de rieles de alimentación.<br>
      • Control del motor BLDC.<br>
      • Accionamiento de solenoides.<br>
      • Control de la válvula Dump.<br>
      • Control de la válvula proporcional de O₂.<br>
      • Control de elementos del sistema Zero/Purge.<br><br>

      Para el motor BLDC utiliza electrónica de potencia
      basada en conmutación MOSFET para controlar las fases
      del motor.
    `;
  }


  /* =======================================================
     CPU
  ======================================================= */

  if (
    q.includes("tarjeta cpu") ||
    q.includes("main logic") ||
    q.includes("procesador") ||
    q.includes("cpu")
  ) {

    return `
      <strong>🧠 Tarjeta CPU / Main Logic</strong><br><br>

      La CPU es el centro de procesamiento y control
      del ventilador.<br><br>

      Según la información suministrada utiliza un
      procesador embebido de 32 bits y ejecuta un
      sistema operativo en tiempo real VxWorks.<br><br>

      Sus funciones incluyen:<br><br>

      • Procesamiento de sensores.<br>
      • Algoritmos de ventilación.<br>
      • Control de presión.<br>
      • Control de flujo.<br>
      • Control de volumen.<br>
      • Control de FiO₂.<br>
      • Gestión de alarmas.<br>
      • Interfaz gráfica.<br>
      • Pantalla táctil.<br>
      • Encoder.<br>
      • Comunicación RS-232.<br>
      • Nurse Call.<br>
      • Memoria de parámetros y calibraciones.<br><br>

      La CPU recibe información de los sensores, toma
      decisiones y envía órdenes a la tarjeta Power/Driver.
    `;
  }


  /* =======================================================
     FILTRO
  ======================================================= */

  if (
    q.includes("filtro de entrada") ||
    q.includes("filtro 0.3") ||
    q.includes("filtro de aire")
  ) {

    return `
      <strong>🧹 Filtro de aire fresco</strong><br><br>

      El filtro de entrada está ubicado en la parte
      posterior del equipo y tiene una capacidad indicada
      de aproximadamente <strong>0.3 µm</strong>.<br><br>

      Su función es evitar que polvo y partículas entren
      al sistema neumático y lleguen a la turbina.<br><br>

      Si se obstruye excesivamente, la turbina debe trabajar
      en condiciones desfavorables y puede disminuir la
      capacidad de generar flujo. También puede contribuir
      a una condición de <strong>Blower Over-Temperature</strong>.<br><br>

      El mantenimiento indicado contempla inspección
      periódica y reemplazo según las horas de operación
      establecidas.
    `;
  }


  /* =======================================================
     SOBRE TEMPERATURA
  ======================================================= */

  if (
    q.includes("sobretemperatura") ||
    q.includes("sobrecalentamiento") ||
    q.includes("blower over temperature") ||
    q.includes("blower fail") ||
    q.includes("turbina caliente")
  ) {

    return `
      <strong>🌡️ Blower Over-Temperature / Blower Fail</strong><br><br>

      Esta condición puede indicar que la turbina ha
      alcanzado una temperatura excesiva o que el sistema
      detecta un problema en su rotación.<br><br>

      Posibles causas:<br><br>

      • Filtro de aire posterior obstruido.<br>
      • Problemas de ventilación del chasis.<br>
      • Turbina trabada.<br>
      • Falla del motor BLDC.<br>
      • Problemas de la tarjeta Power/Driver.<br><br>

      Para diagnóstico biomédico se debe revisar primero
      la entrada de aire, el filtro, condiciones físicas
      de la turbina y posteriormente realizar pruebas
      técnicas del sistema de accionamiento.
    `;
  }


  /* =======================================================
     OVT
  ======================================================= */

  if (
    q.includes("ovt") ||
    q.includes("operator verification") ||
    q.includes("prueba del operador")
  ) {

    return `
      <strong>🔍 OVT — Operator Verification Test</strong><br><br>

      El OVT es una prueba de verificación que se realiza
      entre pacientes o después de realizar cambios en
      el circuito del paciente.<br><br>

      Normalmente se conecta el circuito completo y se
      ocluye la pieza Y con el elemento de prueba.<br><br>

      Durante la prueba el sistema puede verificar:<br><br>

      <strong>• Leak Test:</strong> comprueba la presencia
      de fugas.<br><br>

      <strong>• Compliance Test:</strong> evalúa la
      distensibilidad del circuito.<br><br>

      <strong>• Sensor Y Zero:</strong> verifica el cero
      del sistema de medición.<br><br>

      <strong>• Exhalation Valve Test:</strong> comprueba
      el comportamiento de la válvula de exhalación.<br><br>

      El resultado se muestra como <strong>PASS</strong>
      o <strong>FAIL</strong>.
    `;
  }


  /* =======================================================
     VVT
  ======================================================= */

  if (
    q.includes("vvt") ||
    q.includes("ventilator verification") ||
    q.includes("prueba del ventilador")
  ) {

    return `
      <strong>🧰 VVT — Ventilator Verification Test</strong><br><br>

      El VVT es una prueba técnica más completa que el OVT
      y está destinada a personal de Ingeniería Biomédica
      o servicio técnico calificado.<br><br>

      Puede realizarse durante mantenimiento preventivo
      anual o después de reparaciones importantes.<br><br>

      Requiere instrumentos como:<br><br>

      • Analizador de ventiladores.<br>
      • Medidor de flujo y presión.<br>
      • Pulmón de prueba calibrado.<br>
      • Manómetro digital.<br>
      • Fuente regulada de oxígeno.<br>
      • Multímetro TRMS.<br><br>

      Se verifican aspectos como:<br><br>

      • Sistema neumático.<br>
      • Flujo.<br>
      • Presión.<br>
      • Volumen.<br>
      • Sensores.<br>
      • Alarmas.<br>
      • Alimentación AC/batería.<br>
      • Funcionamiento general.<br><br>

      <strong>Diferencia clave:</strong><br>
      OVT = verificación operativa del equipo/circuito.<br>
      VVT = verificación técnica y metrológica más profunda.
    `;
  }


  /* =======================================================
     CALIBRACION
  ======================================================= */

  if (
    q.includes("calibracion") ||
    q.includes("calibración") ||
    q.includes("como se calibra") ||
    q.includes("calibrar")
  ) {

    return `
      <strong>🛠️ Calibración del iVent™201</strong><br><br>

      La calibración técnica se realiza desde el menú
      de servicio y requiere instrumentos de referencia
      adecuados.<br><br>

      Las principales calibraciones son:<br><br>

      <strong>1. Zero de presión:</strong><br>
      se iguala el sistema a presión atmosférica para
      corregir el offset del sensor.<br><br>

      <strong>2. Presión:</strong><br>
      se aplican presiones conocidas mediante un
      manómetro patrón y se ajusta la respuesta.<br><br>

      <strong>3. Flujo/volumen:</strong><br>
      se utilizan flujos de referencia y se actualizan
      las constantes de compensación.<br><br>

      <strong>4. Oxígeno:</strong><br>
      se calibra utilizando aire ambiente y oxígeno puro
      como puntos de referencia.<br><br>

      <strong>5. PEEP/RPM:</strong><br>
      se verifica el comportamiento de la turbina y
      la estabilidad del PEEP.<br><br>

      Estas actividades deben ser realizadas con
      instrumentos calibrados y por personal técnico
      competente.
    `;
  }


  /* =======================================================
     CALIBRACION PRESION
  ======================================================= */

  if (
    q.includes("calibracion de presion") ||
    q.includes("calibración de presión") ||
    q.includes("calibrar presion") ||
    q.includes("calibrar presión")
  ) {

    return `
      <strong>📏 Calibración del sensor de presión</strong><br><br>

      La calibración comienza realizando el cero del
      sensor a presión atmosférica.<br><br>

      Posteriormente se conecta un manómetro o calibrador
      de presión patrón y se aplican valores conocidos,
      por ejemplo <strong>30 o 80 cmH₂O</strong> según
      el procedimiento correspondiente.<br><br>

      La CPU compara la lectura del sensor con el valor
      patrón y ajusta los parámetros de calibración.<br><br>

      Esta calibración es importante porque las mediciones
      de presión intervienen directamente en el control
      de ventilación y en las alarmas.
    `;
  }


  /* =======================================================
     MANTENIMIENTO
  ======================================================= */

  if (
    q.includes("mantenimiento") ||
    q.includes("mantenimiento preventivo") ||
    q.includes("cada cuanto") ||
    q.includes("cada cuánto")
  ) {

    return `
      <strong>🔧 Mantenimiento preventivo</strong><br><br>

      El mantenimiento indicado se organiza por tiempo
      y horas de funcionamiento.<br><br>

      <strong>👤 Cada paciente / diario:</strong><br>
      cambio o procesamiento del circuito, filtro
      bacteriano y ejecución de OVT.<br><br>

      <strong>⏱️ 500 horas / mensual:</strong><br>
      inspección del filtro de aire fresco.<br><br>

      <strong>⏱️ 1.500 horas / 6 meses:</strong><br>
      revisión y calibración de sensores y elementos
      neumáticos según procedimiento.<br><br>

      <strong>⏱️ 3.000 horas / anual:</strong><br>
      mantenimiento general, sustitución de elementos
      establecidos, calibraciones, VVT e inspección
      de batería.<br><br>

      <strong>⏱️ 15.000 horas / 3–5 años:</strong><br>
      mantenimiento mayor del ensamble neumático,
      turbina y batería según estado y versión.<br><br>

      El objetivo es mantener la exactitud de flujo,
      presión, volumen y oxígeno y reducir el riesgo
      de fallas durante la ventilación.
    `;
  }


  /* =======================================================
     HERRAMIENTAS
  ======================================================= */

  if (
    q.includes("herramientas") ||
    q.includes("instrumentos") ||
    q.includes("que necesito para mantenimiento")
  ) {

    return `
      <strong>🧰 Herramientas de servicio</strong><br><br>

      Para las actividades técnicas se contemplan
      herramientas e instrumentos como:<br><br>

      • Analizador de ventiladores.<br>
      • Flujómetro digital de precisión.<br>
      • Manómetro digital de 0–100 cmH₂O.<br>
      • Pulmón de prueba calibrado.<br>
      • Fuente/regulador de O₂ de alta presión.<br>
      • Multímetro digital TRMS.<br>
      • Destornilladores Torx y Phillips.<br>
      • Tapones de oclusión para pruebas neumáticas.<br><br>

      Para las verificaciones metrológicas es importante
      utilizar instrumentos adecuados y con calibración
      vigente.
    `;
  }


  /* =======================================================
     VALVULA DE ALIVIO
  ======================================================= */

  if (
    q.includes("valvula de alivio") ||
    q.includes("válvula de alivio") ||
    q.includes("pop off") ||
    q.includes("pop-off") ||
    q.includes("sobrepresion mecanica") ||
    q.includes("sobrepresión mecánica")
  ) {

    return `
      <strong>🛡️ Válvula Pop-off de sobrepresión</strong><br><br>

      La válvula Pop-off es una protección mecánica
      independiente de la electrónica del ventilador.<br><br>

      Está diseñada para abrir cuando la presión alcanza
      aproximadamente <strong>80 ± 5 cmH₂O</strong>.<br><br>

      Su importancia está en que proporciona una barrera
      de seguridad incluso si existiera una falla del
      procesador, sensores o sistema de control electrónico.<br><br>

      Es una protección pasiva contra una sobrepresión
      excesiva del sistema neumático.<br><br>

      Esto la diferencia de la alarma High Pressure:
      la alarma y el control electrónico actúan mediante
      software y sensores, mientras que la Pop-off es
      un mecanismo físico independiente.
    `;
  }


  /* =======================================================
     ALTITUD
  ======================================================= */

  if (
    q.includes("altitud") ||
    q.includes("altura") ||
    q.includes("compensacion de altitud") ||
    q.includes("compensación de altitud")
  ) {

    return `
      <strong>🏔️ Compensación de altitud</strong><br><br>

      El ventilador dispone de un sensor barométrico
      interno que mide la presión atmosférica.<br><br>

      La presión ambiental cambia con la altitud y esto
      afecta la densidad del gas y las condiciones de
      generación y medición del flujo.<br><br>

      La CPU utiliza la información barométrica para
      ajustar los cálculos y el comportamiento del sistema,
      incluyendo las condiciones de operación de la turbina
      y las válvulas.<br><br>

      La información suministrada indica operación hasta
      aproximadamente <strong>4.000 metros</strong>.
    `;
  }


  /* =======================================================
     RS232
  ======================================================= */

  if (
    q.includes("rs232") ||
    q.includes("rs-232") ||
    q.includes("comunicacion") ||
    q.includes("comunicación")
  ) {

    return `
      <strong>🔌 Comunicación RS-232</strong><br><br>

      El equipo dispone de una interfaz RS-232 ubicada
      en el panel posterior.<br><br>

      Puede utilizarse para transmitir información como:<br><br>

      • Parámetros numéricos.<br>
      • Eventos de alarma.<br>
      • Información de las curvas.<br>
      • Datos de funcionamiento.<br><br>

      Esta comunicación puede ser útil para sistemas de
      monitorización, integración con sistemas de información
      o herramientas de servicio técnico.
    `;
  }


  /* =======================================================
     NURSE CALL
  ======================================================= */

  if (
    q.includes("nurse call") ||
    q.includes("llamada a enfermera") ||
    q.includes("llamada enfermera")
  ) {

    return `
      <strong>🏥 Nurse Call</strong><br><br>

      Nurse Call es una interfaz destinada a comunicar
      determinadas condiciones de alarma hacia un sistema
      externo de llamada a enfermería.<br><br>

      La información suministrada indica una interfaz
      mediante contactos de relé normalmente abierto
      y normalmente cerrado.<br><br>

      Ante una alarma de alta prioridad, el sistema puede
      activar el circuito externo para generar una
      señal de aviso remoto.
    `;
  }


  /* =======================================================
     INTERFAZ
  ======================================================= */

  if (
    q.includes("pantalla") ||
    q.includes("interfaz") ||
    q.includes("encoder") ||
    q.includes("perilla")
  ) {

    return `
      <strong>🖥️ Interfaz de usuario</strong><br><br>

      El iVent™201 utiliza una pantalla TFT a color
      de <strong>8.4 pulgadas</strong> con resolución
      de aproximadamente <strong>640 × 480 píxeles</strong>.<br><br>

      La interacción puede realizarse mediante:<br><br>

      • Pantalla táctil resistiva.<br>
      • Perilla giratoria Encoder.<br>
      • Teclas de acceso directo.<br>
      • Indicadores luminosos.<br><br>

      La pantalla puede mostrar curvas de:<br><br>

      • Presión vs tiempo.<br>
      • Flujo vs tiempo.<br>
      • Volumen vs tiempo.<br>
      • Bucle presión-volumen.<br>
      • Bucle flujo-volumen.
    `;
  }


  /* =======================================================
     FUNCIONES ESPECIALES
  ======================================================= */

  if (
    q.includes("insp hold") ||
    q.includes("inspiratory hold") ||
    q.includes("pausa inspiratoria")
  ) {

    return `
      <strong>⏸️ Insp Hold</strong><br><br>

      La función Insp Hold mantiene temporalmente la
      fase inspiratoria cerrada para permitir la medición
      de la presión del sistema al final de la inspiración.<br><br>

      Esta información puede utilizarse para evaluar
      presión meseta y determinadas características
      mecánicas del sistema respiratorio.
    `;
  }


  if (
    q.includes("exp hold") ||
    q.includes("pausa espiratoria")
  ) {

    return `
      <strong>⏸️ Exp Hold</strong><br><br>

      Exp Hold mantiene cerrada la válvula de exhalación
      al final de la espiración para permitir la evaluación
      de la presión existente en el sistema.<br><br>

      Esta función puede utilizarse para evaluar
      condiciones relacionadas con Auto-PEEP.
    `;
  }


  if (
    q.includes("100% o2") ||
    q.includes("100 o2") ||
    q.includes("succion") ||
    q.includes("succión")
  ) {

    return `
      <strong>💨 100 % O₂ / Suction Support</strong><br><br>

      La función de soporte para aspiración permite
      administrar una concentración elevada de oxígeno
      durante una maniobra de aspiración de secreciones.<br><br>

      La información suministrada indica una duración
      aproximada de <strong>2 minutos</strong>, después
      de la cual los parámetros vuelven automáticamente
      a su configuración correspondiente.
    `;
  }


  /* =======================================================
     PARAMETROS
  ======================================================= */

  if (
    q.includes("parametros") ||
    q.includes("parámetros") ||
    q.includes("rangos")
  ) {

    return `
      <strong>📋 Parámetros principales</strong><br><br>

      <strong>VT:</strong> 50–2000 mL.<br>
      <strong>Frecuencia:</strong> 1–80 respiraciones/min.<br>
      <strong>Ti:</strong> 0.2–3.0 s.<br>
      <strong>I:E:</strong> 1:1 a 1:10; inversión hasta 4:1.<br>
      <strong>Presión inspiratoria:</strong> 5–80 cmH₂O.<br>
      <strong>Presión de soporte:</strong> 0–60 cmH₂O.<br>
      <strong>PEEP/CPAP:</strong> 0–40 cmH₂O.<br>
      <strong>FiO₂:</strong> 21–100 %.<br>
      <strong>Trig-Flow:</strong> 1–20 L/min.<br>
      <strong>Trig-Press:</strong> -0.5 a -20 cmH₂O.<br>
      <strong>Apnea:</strong> 10–60 s.<br>
      <strong>Flujo máximo al paciente:</strong> aproximadamente
      120 L/min.
    `;
  }


  /* =======================================================
     ALIMENTACION
  ======================================================= */

  if (
    q.includes("alimentacion") ||
    q.includes("alimentación") ||
    q.includes("voltaje") ||
    q.includes("corriente electrica") ||
    q.includes("corriente eléctrica")
  ) {

    return `
      <strong>⚡ Alimentación eléctrica</strong><br><br>

      El equipo dispone de varias fuentes de alimentación.<br><br>

      <strong>AC:</strong><br>
      100–240 VAC, 50/60 Hz, máximo aproximadamente 2.0 A.<br><br>

      <strong>DC externa:</strong><br>
      12–15 VDC, aproximadamente 8.5 A.<br><br>

      <strong>Batería interna:</strong><br>
      sistema recargable de 12 V dependiendo de la
      versión del equipo.<br><br>

      La tarjeta Power/Driver administra la alimentación
      y puede realizar la transición hacia batería cuando
      se pierde la fuente AC.
    `;
  }


  /* =======================================================
     SEGURIDAD
  ======================================================= */

  if (
    q.includes("seguridad") ||
    q.includes("precauciones") ||
    q.includes("precaucion") ||
    q.includes("riesgos")
  ) {

    return `
      <strong>🛡️ Seguridad del iVent™201</strong><br><br>

      Existen tres áreas principales de seguridad:
      eléctrica, neumática y relacionada con oxígeno.<br><br>

      <strong>⚡ Seguridad eléctrica:</strong><br>
      utilizar alimentación con puesta a tierra adecuada
      y no retirar las cubiertas mientras el equipo está
      conectado a la red.<br><br>

      <strong>🔥 Seguridad con oxígeno:</strong><br>
      el oxígeno favorece la combustión. No deben existir
      llamas, chispas, aceites ni grasas derivadas del
      petróleo cerca de las conexiones de O₂.<br><br>

      <strong>💨 Seguridad neumática:</strong><br>
      se deben evitar obstrucciones y dobleces del circuito.
      La válvula Pop-off proporciona protección mecánica
      frente a sobrepresión.<br><br>

      <strong>🧼 Limpieza:</strong><br>
      el equipo no debe sumergirse ni permitirse la entrada
      de líquidos por las rejillas o puertos neumáticos.
    `;
  }


  /* =======================================================
     LIMPIEZA
  ======================================================= */

  if (
    q.includes("limpieza") ||
    q.includes("limpiar") ||
    q.includes("desinfeccion") ||
    q.includes("desinfección")
  ) {

    return `
      <strong>🧼 Limpieza</strong><br><br>

      El equipo no debe sumergirse en líquidos.<br><br>

      La limpieza externa puede realizarse utilizando un
      paño ligeramente humedecido con productos compatibles
      indicados por el fabricante, incluyendo alcohol
      isopropílico al 70 % según la información suministrada.<br><br>

      Se debe evitar especialmente que el líquido ingrese
      por:<br><br>

      • Rejillas de ventilación.<br>
      • Entrada de aire.<br>
      • Puertos neumáticos.<br>
      • Conectores eléctricos.<br><br>

      La entrada de líquidos puede afectar sensores,
      electrónica y componentes neumáticos.
    `;
  }


  /* =======================================================
     DIMENSIONES
  ======================================================= */

  if (
    q.includes("dimensiones") ||
    q.includes("medidas") ||
    q.includes("tamaño") ||
    q.includes("tamano")
  ) {

    return `
      <strong>📏 Dimensiones</strong><br><br>

      Las dimensiones indicadas son aproximadamente:<br><br>

      <strong>33 cm de ancho × 24 cm de alto ×
      26 cm de profundidad.</strong>
    `;
  }


  /* =======================================================
     PESO
  ======================================================= */

  if (
    q.includes("peso") ||
    q.includes("cuanto pesa") ||
    q.includes("cuánto pesa")
  ) {

    return `
      <strong>⚖️ Peso</strong><br><br>

      El peso indicado es aproximadamente
      <strong>12.6 kg</strong> con la configuración
      de batería estándar.
    `;
  }


  /* =======================================================
     CONDICIONES AMBIENTALES
  ======================================================= */

  if (
    q.includes("temperatura") ||
    q.includes("condiciones ambientales") ||
    q.includes("humedad")
  ) {

    return `
      <strong>🌡️ Condiciones ambientales</strong><br><br>

      <strong>Temperatura de operación:</strong>
      -10 a 50 °C.<br><br>

      <strong>Temperatura de almacenamiento:</strong>
      -20 a 60 °C.<br><br>

      <strong>Humedad:</strong>
      10–95 % sin condensación.<br><br>

      <strong>Altitud:</strong>
      hasta aproximadamente 4.000 m.
    `;
  }


  /* =======================================================
     TROUBLESHOOTING
  ======================================================= */

  if (
    q.includes("no enciende") ||
    q.includes("no prende") ||
    q.includes("no funciona") ||
    q.includes("diagnostico") ||
    q.includes("diagnóstico") ||
    q.includes("falla")
  ) {

    return `
      <strong>🔧 Diagnóstico técnico</strong><br><br>

      Para diagnosticar una falla del iVent™201 conviene
      separar el problema en cuatro grupos:<br><br>

      <strong>1. Alimentación:</strong><br>
      revisar AC, DC externa, fusibles y batería.<br><br>

      <strong>2. Neumática:</strong><br>
      revisar circuito, filtros, válvulas, turbina,
      conexiones y fugas.<br><br>

      <strong>3. Sensores:</strong><br>
      revisar sensores de presión, sensor Y, líneas
      neumáticas, condensación y Zero/Purge.<br><br>

      <strong>4. Electrónica/control:</strong><br>
      revisar CPU, Power/Driver, actuadores y señales
      de control.<br><br>

      Las pruebas OVT y VVT ayudan a determinar si la
      anomalía está relacionada con el circuito, sensores,
      neumática, alimentación o control electrónico.
    `;
  }


  /* =======================================================
     OXIGENO PRESION
  ======================================================= */

  if (
    q.includes("presion de oxigeno") ||
    q.includes("presión de oxígeno") ||
    q.includes("presion o2") ||
    q.includes("psi")
  ) {

    return `
      <strong>💨 Suministro de oxígeno</strong><br><br>

      La entrada de oxígeno de alta presión está indicada
      aproximadamente entre <strong>40 y 73.5 psi</strong>,
      equivalente aproximadamente a 275–500 kPa.<br><br>

      La conexión puede utilizar interfaces DISS/NIST
      según la configuración.<br><br>

      También existe una entrada de baja presión que puede
      recibir aproximadamente hasta <strong>15 L/min</strong>.<br><br>

      El suministro correcto es importante porque una
      presión incorrecta puede afectar la capacidad del
      sistema para alcanzar la FiO₂ seleccionada.
    `;
  }


  /* =======================================================
     CIRCUITO DEL PACIENTE
  ======================================================= */

  if (
    q.includes("circuito del paciente") ||
    q.includes("circuito paciente") ||
    q.includes("como es el circuito")
  ) {

    return `
      <strong>🫁 Circuito del paciente</strong><br><br>

      El circuito puede utilizar una configuración de
      rama única con válvula de exhalación distal o una
      configuración de doble rama, dependiendo del sistema.<br><br>

      Incluye principalmente:<br><br>

      • Rama inspiratoria.<br>
      • Pieza Y.<br>
      • Sensor de flujo distal.<br>
      • Líneas de medición neumática.<br>
      • Línea de control de exhalación.<br>
      • Válvula de exhalación.<br><br>

      Las líneas finas del sensor Y son especialmente
      importantes porque transmiten la presión diferencial
      hacia los sensores del sistema.<br><br>

      Una obstrucción, humedad, desconexión o daño en estas
      líneas puede afectar las mediciones y generar alarmas.
    `;
  }


  /* =======================================================
     REPUESTOS
  ======================================================= */

  if (
    q.includes("repuestos") ||
    q.includes("partes") ||
    q.includes("numero de parte") ||
    q.includes("numero de pieza")
  ) {

    return `
      <strong>🔩 Repuestos y partes principales</strong><br><br>

      Algunos números de parte suministrados son:<br><br>

      <strong>M1162011:</strong> filtro de entrada de aire fresco.<br>
      <strong>M1162015:</strong> filtro bacteriano/viral inspiratorio.<br>
      <strong>M1162020:</strong> celda galvánica de O₂.<br>
      <strong>M1162050:</strong> módulo de batería.<br>
      <strong>M1162030:</strong> sensor de flujo distal Y.<br>
      <strong>M1162080:</strong> ensamble neumático completo.<br><br>

      La compatibilidad exacta debe comprobarse con la
      versión del equipo y la documentación de servicio.
    `;
  }


  /* =======================================================
     RELACIONES ENTRE COMPONENTES
  ======================================================= */

  if (
    q.includes("relacion entre componentes") ||
    q.includes("relación entre componentes") ||
    q.includes("como se relacionan") ||
    q.includes("como trabajan juntos")
  ) {

    return `
      <strong>🔗 Relación entre componentes</strong><br><br>

      El iVent™201 funciona como un sistema integrado,
      no como componentes independientes.<br><br>

      <strong>Lazo de presión:</strong><br>
      Sensor de presión → CPU → Power/Driver →
      turbina / Dump → cambio de presión → sensor nuevamente.<br><br>

      <strong>Lazo de FiO₂:</strong><br>
      Sensor de flujo interno → CPU → PWM →
      válvula proporcional de O₂ → mezcla → celda de O₂ →
      verificación.<br><br>

      <strong>Lazo de PEEP:</strong><br>
      Turbina → bias flow → válvula de exhalación →
      presión PEEP → sensor → CPU.<br><br>

      <strong>Medición de volumen:</strong><br>
      Sensor Y → presión diferencial → CPU →
      integración del flujo → volumen corriente.<br><br>

      La característica fundamental del equipo es la
      interacción permanente entre sensores, CPU,
      actuadores y sistema neumático.
    `;
  }


  /* =======================================================
     RESPUESTA GENERAL
  ======================================================= */

  return `
    <strong>🤖 Asistente técnico iVent™201</strong><br><br>

    Puedo responder preguntas técnicas más específicas
    sobre el ventilador utilizando la información del
    manual incorporada en esta plataforma.<br><br>

    Puedes preguntarme, por ejemplo:<br><br>

    🫁 <strong>Funcionamiento</strong><br>
    “¿Cómo funciona el iVent desde que entra el aire
    hasta que llega al paciente?”<br><br>

    ⚙️ <strong>Turbina</strong><br>
    “¿Cómo trabajan la turbina y la válvula Dump?”<br><br>

    📊 <strong>Control</strong><br>
    “¿Cómo controla la presión mediante lazo cerrado?”<br><br>

    💨 <strong>Flujo</strong><br>
    “¿Cómo calcula el volumen corriente?”<br><br>

    🧪 <strong>Oxígeno</strong><br>
    “¿Cómo controla la FiO₂?”<br><br>

    🎯 <strong>Trigger</strong><br>
    “¿Cómo detecta que el paciente quiere inspirar?”<br><br>

    🚨 <strong>Alarmas</strong><br>
    “¿Qué puede causar una alarma High Pressure?”<br><br>

    🔧 <strong>Mantenimiento</strong><br>
    “¿Cuál es la diferencia entre OVT y VVT?”<br><br>

    🛠️ <strong>Calibración</strong><br>
    “¿Cómo se calibra la celda de oxígeno?”<br><br>

    🔬 <strong>Diagnóstico</strong><br>
    “¿Qué reviso si aparece Flow Sensor Error?”<br><br>

    También puedo explicar la relación entre la
    <strong>CPU, Power/Driver, Zero/Purge, sensores,
    turbina y válvulas</strong>.
  `;
}


/* =========================================================
   NORMALIZAR TEXTO
========================================================= */

function normalizeText(text) {

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}


/* =========================================================
   SEGURIDAD DEL TEXTO DEL USUARIO
========================================================= */

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


/* =========================================================
   GENERADOR DE QR
========================================================= */

function generarQR() {

  const qr = document.getElementById("qrCode");

  if (!qr) {
    return;
  }

  const enlacePlataforma =
    "https://codepen.io/editor/duban16/pen/01a10821-9013-751b-a00c-38a6d28a3bbf?show=preview";

  qr.innerHTML = "";

  const imagenQR = document.createElement("img");

  imagenQR.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
    encodeURIComponent(enlacePlataforma);

  imagenQR.alt =
    "Código QR de la plataforma iVent 201";

  imagenQR.style.width = "250px";
  imagenQR.style.height = "250px";
  imagenQR.style.display = "block";
  imagenQR.style.margin = "auto";

  qr.appendChild(imagenQR);
}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

  generarQR();

  const input = document.getElementById("aiInput");

  if (input) {

    input.addEventListener("keydown", function(event) {

      if (event.key === "Enter") {

        event.preventDefault();

        askAI();

      }

    });

  }

});