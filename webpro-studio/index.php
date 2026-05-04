<?php
// ===== CONFIG =====
$app_name       = "WEBPRO STUDIO";
$tagline        = "Tu Mundo. Tus Videos.";
$version        = "v2.5.0";
$download_url   = "#descargar";
$whatsapp       = ""; // tu número sin + ni espacios
$telegram       = "#";
$email          = "contacto@webprostudio.com";

// Cuenta regresiva (cambia la fecha)
$deadline = "2025-12-31 23:59:59";
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="WEBPRO STUDIO – La app de streaming #1 para Android. Más de 50,000 canales en HD. Descarga gratis ahora.">
<meta name="theme-color" content="#FF0000">
<title>WEBPRO STUDIO – La App de Streaming #1 para Android</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<!-- ════ URGENCY TOP BAR ════ -->
<div class="urgency-bar" id="urgencyBar">
  <div class="urgency-inner">
    <span class="urgency-fire">🔥</span>
    <span class="urgency-text"><strong>OFERTA ESPECIAL:</strong> ¡Primer mes al 50% de descuento!</span>
    <div class="countdown-mini" id="countdownMini">
      <div class="cd-unit"><span id="cdH">00</span><small>H</small></div>
      <div class="cd-sep">:</div>
      <div class="cd-unit"><span id="cdM">00</span><small>M</small></div>
      <div class="cd-sep">:</div>
      <div class="cd-unit"><span id="cdS">00</span><small>S</small></div>
    </div>
    <a href="#planes" class="urgency-cta">Ver Oferta →</a>
  </div>
  <button class="urgency-close" onclick="document.getElementById('urgencyBar').style.display='none'">✕</button>
</div>

<!-- ════ NAVBAR ════ -->
<nav class="navbar" id="navbar">
  <div class="nav-wrap">
    <a href="#inicio" class="nav-logo">
      <div class="logo-box">
        <i class="fab fa-youtube"></i>
        <span class="logo-crown">♛</span>
      </div>
      <div class="logo-text">
        <span><b class="lw">WEB</b><b class="lr">PRO</b></span>
        <small>STUDIO</small>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#como-funciona">Cómo Funciona</a></li>
      <li><a href="#planes">Planes</a></li>
      <li><a href="#testimonios">Reviews</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <div class="nav-right">
      <a href="<?= $download_url ?>" class="btn-nav-dl">
        <i class="fab fa-android"></i> Descargar Gratis
      </a>
    </div>
    <button class="ham" id="ham"><span></span><span></span><span></span></button>
  </div>
  <div class="mob-menu" id="mobMenu">
    <a href="#inicio">Inicio</a>
    <a href="#como-funciona">Cómo Funciona</a>
    <a href="#planes">Planes</a>
    <a href="#testimonios">Reviews</a>
    <a href="#faq">FAQ</a>
    <a href="<?= $download_url ?>" class="mob-dl"><i class="fab fa-android"></i> Descargar Gratis</a>
  </div>
</nav>

<!-- ════ HERO ════ -->
<section class="hero" id="inicio">
  <div class="hero-overlay"></div>
  <canvas id="heroCanvas"></canvas>

  <div class="hero-container">
    <div class="hero-left reveal-left">

      <div class="hero-trust-bar">
        <div class="htb-item"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><span>4.9/5 – 2,400+ reseñas</span></div>
        <div class="htb-divider"></div>
        <div class="htb-item"><i class="fas fa-users"></i><span>+10,000 usuarios activos</span></div>
      </div>

      <div class="hero-label">
        <span class="pulse-dot"></span> SOLO PARA ANDROID – DESCARGA GRATUITA
      </div>

      <h1 class="hero-h1">
        <span class="h1-line1">LA APP DE</span>
        <span class="h1-line2">STREAMING</span>
        <span class="h1-line3">#<span class="h1-num" data-target="1">0</span> EN <span class="red-glow">ANDROID</span></span>
      </h1>

      <p class="hero-sub">
        Más de <strong>50,000 canales HD</strong>, películas, series y contenido en vivo.
        Sin contratos. Sin cables. Solo descarga y disfruta.
      </p>

      <div class="hero-proof">
        <div class="proof-avatars">
          <div class="av av1"></div><div class="av av2"></div><div class="av av3"></div><div class="av av4"></div><div class="av av5"></div>
        </div>
        <div class="proof-text">
          <strong>+10,847 personas</strong> descargaron esta semana
        </div>
      </div>

      <div class="hero-ctas">
        <a href="<?= $download_url ?>" class="btn-hero-main" id="descargar">
          <div class="btn-glow"></div>
          <i class="fab fa-android"></i>
          <div class="btn-txt">
            <small>Descarga 100% Gratis</small>
            <strong>Obtener WEBPRO STUDIO</strong>
          </div>
          <span class="btn-arrow"><i class="fas fa-chevron-right"></i></span>
        </a>
        <a href="#planes" class="btn-hero-sec">
          <i class="fas fa-crown"></i>
          <div class="btn-txt">
            <small>Desde $5/mes</small>
            <strong>Ver Planes Premium</strong>
          </div>
        </a>
      </div>

      <div class="hero-badges">
        <div class="hbadge"><i class="fas fa-shield-alt"></i> Sin virus</div>
        <div class="hbadge"><i class="fas fa-lock"></i> 100% Seguro</div>
        <div class="hbadge"><i class="fas fa-sync-alt"></i> Actualizaciones gratis</div>
        <div class="hbadge"><i class="fas fa-bolt"></i> Instalación rápida</div>
      </div>

    </div>

    <div class="hero-right reveal-right">
      <div class="phone-scene">
        <div class="phone-glow-ring"></div>
        <div class="phone-glow-ring r2"></div>
        <div class="phone-wrap">
          <div class="phone-device">
            <div class="pscreen">
              <div class="pnotch"></div>
              <div class="pui">
                <div class="pheader">
                  <div class="plogo"><span class="pw">WEB</span><span class="pp">PRO</span></div>
                  <div class="picons"><i class="fas fa-search"></i><i class="fas fa-bell"></i></div>
                </div>
                <div class="pbanner">
                  <div class="plive"><span class="live-dot"></span> EN VIVO</div>
                  <div class="pbanner-content">
                    <p>Canal Principal</p>
                    <small>1,240 viendo ahora</small>
                  </div>
                  <div class="pplay"><i class="fas fa-play"></i></div>
                </div>
                <div class="pcats">
                  <span class="pcat active">Todos</span>
                  <span class="pcat">Deportes</span>
                  <span class="pcat">Películas</span>
                  <span class="pcat">Series</span>
                </div>
                <div class="pgrid">
                  <div class="pcard"><div class="pthumb g1"><span class="ptag">HD</span></div><div class="ptitle"></div><div class="psub"></div></div>
                  <div class="pcard"><div class="pthumb g2"><span class="ptag">4K</span></div><div class="ptitle"></div><div class="psub"></div></div>
                  <div class="pcard"><div class="pthumb g3"><span class="ptag">EN VIVO</span></div><div class="ptitle"></div><div class="psub"></div></div>
                  <div class="pcard"><div class="pthumb g4"><span class="ptag">HD</span></div><div class="ptitle"></div><div class="psub"></div></div>
                </div>
                <div class="pnav">
                  <i class="fas fa-home active"></i>
                  <i class="fas fa-compass"></i>
                  <div class="pnavcenter"><i class="fas fa-play"></i></div>
                  <i class="fas fa-heart"></i>
                  <i class="fas fa-user"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Floating badges -->
        <div class="float-badge fb1">
          <i class="fas fa-star" style="color:#FFD700"></i>
          <div><strong>4.9/5</strong><small>Rating</small></div>
        </div>
        <div class="float-badge fb2">
          <i class="fas fa-tv" style="color:#FF0000"></i>
          <div><strong>50K+</strong><small>Canales</small></div>
        </div>
        <div class="float-badge fb3">
          <i class="fab fa-android" style="color:#3DDC84"></i>
          <div><strong>Android</strong><small>Compatible</small></div>
        </div>
      </div>
    </div>
  </div>

  <div class="hero-scroll-hint">
    <span>Descubre más</span>
    <div class="scroll-mouse"><div class="scroll-wheel"></div></div>
  </div>
</section>

<!-- ════ SOCIAL PROOF STRIP ════ -->
<div class="proof-strip">
  <div class="proof-strip-inner">
    <div class="ps-item"><span class="ps-num counter" data-target="50000">0</span><span>+</span><p>Canales Disponibles</p></div>
    <div class="ps-div"></div>
    <div class="ps-item"><span class="ps-num counter" data-target="10000">0</span><span>+</span><p>Usuarios Activos</p></div>
    <div class="ps-div"></div>
    <div class="ps-item"><span class="ps-num">4.9</span><span>★</span><p>Calificación Media</p></div>
    <div class="ps-div"></div>
    <div class="ps-item"><span class="ps-num">99</span><span>%</span><p>Uptime Garantizado</p></div>
    <div class="ps-div"></div>
    <div class="ps-item"><span class="ps-num counter" data-target="500">0</span><span>+</span><p>Resellers Activos</p></div>
  </div>
</div>

<!-- ════ PROBLEMA / SOLUCIÓN ════ -->
<section class="problem-section">
  <div class="container">
    <div class="problem-grid">
      <div class="problem-col reveal">
        <div class="section-eyebrow red">¿Te Identificas?</div>
        <h2>¿Cansado de pagar<br><span class="red">demasiado</span> por streaming?</h2>
        <div class="problem-list">
          <div class="prob-item">
            <div class="prob-x"><i class="fas fa-times"></i></div>
            <p>Pagas $15–$30/mes por Netflix y solo ves 3 series</p>
          </div>
          <div class="prob-item">
            <div class="prob-x"><i class="fas fa-times"></i></div>
            <p>El contenido que quieres no está disponible en tu país</p>
          </div>
          <div class="prob-item">
            <div class="prob-x"><i class="fas fa-times"></i></div>
            <p>Mala calidad de imagen cuando más la necesitas</p>
          </div>
          <div class="prob-item">
            <div class="prob-x"><i class="fas fa-times"></i></div>
            <p>Plataformas lentas con demasiados anuncios</p>
          </div>
        </div>
      </div>
      <div class="solution-col reveal">
        <div class="section-eyebrow green">La Solución</div>
        <h2>WEBPRO STUDIO<br><span class="red">resuelve todo eso</span></h2>
        <div class="solution-list">
          <div class="sol-item">
            <div class="sol-check"><i class="fas fa-check"></i></div>
            <p><strong>Desde $5/mes</strong> – 10x más barato que la competencia</p>
          </div>
          <div class="sol-item">
            <div class="sol-check"><i class="fas fa-check"></i></div>
            <p><strong>50,000+ canales</strong> internacionales sin restricciones geográficas</p>
          </div>
          <div class="sol-item">
            <div class="sol-check"><i class="fas fa-check"></i></div>
            <p><strong>Calidad HD/4K</strong> sin cortes, sin buffering</p>
          </div>
          <div class="sol-item">
            <div class="sol-check"><i class="fas fa-check"></i></div>
            <p><strong>Sin anuncios</strong> en el contenido premium</p>
          </div>
        </div>
        <a href="<?= $download_url ?>" class="btn-solution">
          <i class="fab fa-android"></i> Empezar Ahora – Es Gratis
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ════ CÓMO FUNCIONA ════ -->
<section class="how-section" id="como-funciona">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-eyebrow red">Súper Simple</div>
      <h2>Empieza en <span class="red">3 pasos</span></h2>
      <p>Sin tarjeta de crédito. Sin complicaciones. Listo en minutos.</p>
    </div>
    <div class="steps-grid">
      <div class="step-card reveal">
        <div class="step-number">01</div>
        <div class="step-icon"><i class="fas fa-download"></i></div>
        <h3>Descarga el APK</h3>
        <p>Descarga el archivo APK directamente en tu Android. Proceso rápido de menos de 30 segundos.</p>
        <div class="step-arrow"><i class="fas fa-chevron-right"></i></div>
      </div>
      <div class="step-card reveal" style="--delay:.15s">
        <div class="step-number">02</div>
        <div class="step-icon"><i class="fas fa-user-plus"></i></div>
        <h3>Elige tu Plan</h3>
        <p>Selecciona el plan que más se adapta a ti. Desde usuario individual hasta Super Reseller.</p>
        <div class="step-arrow"><i class="fas fa-chevron-right"></i></div>
      </div>
      <div class="step-card reveal" style="--delay:.3s">
        <div class="step-number">03</div>
        <div class="step-icon"><i class="fas fa-play-circle"></i></div>
        <h3>¡Disfruta!</h3>
        <p>Accede a miles de canales HD al instante. Tu entretenimiento sin límites comienza ahora.</p>
      </div>
    </div>
  </div>
</section>

<!-- ════ FEATURES AVANZADAS ════ -->
<section class="features-section" id="caracteristicas">
  <div class="feat-bg-grid"></div>
  <div class="container">
    <div class="section-header reveal">
      <div class="section-eyebrow red">¿Por qué elegirnos?</div>
      <h2>Todo lo que necesitas,<br><span class="red">nada que no necesites</span></h2>
    </div>
    <div class="feat-layout">
      <div class="feat-big reveal">
        <div class="fb-icon"><i class="fas fa-broadcast-tower"></i></div>
        <h3>50,000+ Canales<br>en Tiempo Real</h3>
        <p>Canales de todo el mundo, deportes en vivo, noticias, entretenimiento y más. Actualización constante del catálogo.</p>
        <div class="fb-stat">
          <span><i class="fas fa-globe"></i> 150+ países</span>
          <span><i class="fas fa-film"></i> 10,000+ VOD</span>
        </div>
      </div>
      <div class="feat-small-grid">
        <div class="fs-card reveal" style="--delay:.1s">
          <div class="fsc-icon red"><i class="fas fa-tv"></i></div>
          <h4>Calidad HD / 4K</h4>
          <p>Stream sin cortes en la mejor resolución disponible.</p>
        </div>
        <div class="fs-card reveal" style="--delay:.2s">
          <div class="fsc-icon gold"><i class="fas fa-bolt"></i></div>
          <h4>Carga Instantánea</h4>
          <p>Tecnología anti-buffering para reproducción fluida.</p>
        </div>
        <div class="fs-card reveal" style="--delay:.3s">
          <div class="fsc-icon green"><i class="fas fa-shield-alt"></i></div>
          <h4>Anti-ban &amp; Seguro</h4>
          <p>Conexión cifrada. Sin riesgos para tu dispositivo.</p>
        </div>
        <div class="fs-card reveal" style="--delay:.4s">
          <div class="fsc-icon blue"><i class="fas fa-sync-alt"></i></div>
          <h4>Actualizaciones</h4>
          <p>Siempre la versión más nueva, gratis y automático.</p>
        </div>
        <div class="fs-card reveal" style="--delay:.5s">
          <div class="fsc-icon purple"><i class="fas fa-clock"></i></div>
          <h4>24/7 Disponible</h4>
          <p>Servidores activos los 365 días del año, sin interrupciones.</p>
        </div>
        <div class="fs-card reveal" style="--delay:.6s">
          <div class="fsc-icon orange"><i class="fas fa-headset"></i></div>
          <h4>Soporte Rápido</h4>
          <p>Equipo de soporte respondiendo en menos de 1 hora.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════ COMPARATIVA ════ -->
<section class="compare-section">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-eyebrow red">Comparativa Honesta</div>
      <h2>WEBPRO STUDIO <span class="red">vs</span> La Competencia</h2>
    </div>
    <div class="compare-table-wrap reveal">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Característica</th>
            <th class="our-col"><span><i class="fab fa-youtube"></i>♛ WEBPRO</span></th>
            <th>Netflix</th>
            <th>Otras Apps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Precio mensual</td>
            <td class="our-col good">Desde $5</td>
            <td class="bad">Desde $18</td>
            <td class="mid">$8–$15</td>
          </tr>
          <tr>
            <td>Canales en vivo</td>
            <td class="our-col good">50,000+</td>
            <td class="bad">No incluye</td>
            <td class="mid">5,000–15,000</td>
          </tr>
          <tr>
            <td>Calidad 4K</td>
            <td class="our-col good"><i class="fas fa-check-circle"></i></td>
            <td class="mid"><i class="fas fa-check-circle"></i></td>
            <td class="bad"><i class="fas fa-times-circle"></i></td>
          </tr>
          <tr>
            <td>Sin contrato</td>
            <td class="our-col good"><i class="fas fa-check-circle"></i></td>
            <td class="bad"><i class="fas fa-times-circle"></i></td>
            <td class="mid">Algunos</td>
          </tr>
          <tr>
            <td>Programa Reseller</td>
            <td class="our-col good"><i class="fas fa-check-circle"></i></td>
            <td class="bad"><i class="fas fa-times-circle"></i></td>
            <td class="bad"><i class="fas fa-times-circle"></i></td>
          </tr>
          <tr>
            <td>Soporte en español</td>
            <td class="our-col good"><i class="fas fa-check-circle"></i></td>
            <td class="mid">Limitado</td>
            <td class="bad"><i class="fas fa-times-circle"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ════ TESTIMONIOS ════ -->
<section class="testimonios-section" id="testimonios">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-eyebrow red">Ellos ya lo usan</div>
      <h2>Lo que dicen nuestros <span class="red">clientes</span></h2>
      <div class="overall-rating">
        <div class="or-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <span class="or-num">4.9/5</span>
        <span class="or-count">basado en 2,400+ reseñas</span>
      </div>
    </div>
    <div class="testi-grid">
      <div class="testi-card reveal">
        <div class="tcard-top">
          <div class="tcard-av av-a">JM</div>
          <div>
            <strong>Juan Martínez</strong>
            <small>Cliente Premium – Venezuela</small>
          </div>
          <div class="tcard-verified"><i class="fas fa-check-circle"></i> Verificado</div>
        </div>
        <div class="tcard-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"Llevo 6 meses usando WEBPRO STUDIO y es increíble. La calidad HD es perfecta y nunca he tenido problemas de conexión. <strong>Recomendado al 100%.</strong>"</p>
        <div class="tcard-date"><i class="fas fa-calendar-check"></i> Hace 2 semanas</div>
      </div>
      <div class="testi-card featured-tcard reveal" style="--delay:.1s">
        <div class="featured-quote"><i class="fas fa-quote-left"></i></div>
        <div class="tcard-top">
          <div class="tcard-av av-b">SR</div>
          <div>
            <strong>Sandra Rodríguez</strong>
            <small>Super Reseller – Colombia</small>
          </div>
          <div class="tcard-verified"><i class="fas fa-check-circle"></i> Verificado</div>
        </div>
        <div class="tcard-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"Empecé como reseller y en 3 meses ya soy Super Reseller. <strong>Gano más de $800/mes</strong> vendiendo créditos. El panel es muy fácil de usar y el soporte siempre está ahí."</p>
        <div class="tcard-income"><i class="fas fa-chart-line"></i> +$800/mes de ingresos</div>
        <div class="tcard-date"><i class="fas fa-calendar-check"></i> Hace 1 mes</div>
      </div>
      <div class="testi-card reveal" style="--delay:.2s">
        <div class="tcard-top">
          <div class="tcard-av av-c">CL</div>
          <div>
            <strong>Carlos López</strong>
            <small>Reseller Pro – México</small>
          </div>
          <div class="tcard-verified"><i class="fas fa-check-circle"></i> Verificado</div>
        </div>
        <div class="tcard-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
        <p>"La mejor inversión que hice este año. Tengo 30 clientes activos y todos están felices con el servicio. <strong>El soporte es rapidísimo.</strong>"</p>
        <div class="tcard-date"><i class="fas fa-calendar-check"></i> Hace 3 semanas</div>
      </div>
      <div class="testi-card reveal" style="--delay:.3s">
        <div class="tcard-top">
          <div class="tcard-av av-d">MP</div>
          <div>
            <strong>María Pérez</strong>
            <small>Cliente VIP – Ecuador</small>
          </div>
          <div class="tcard-verified"><i class="fas fa-check-circle"></i> Verificado</div>
        </div>
        <div class="tcard-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"Cancelé Netflix y me pasé a WEBPRO STUDIO. Tengo 10 veces más canales pagando menos. <strong>Imposible comparar.</strong>"</p>
        <div class="tcard-date"><i class="fas fa-calendar-check"></i> Hace 5 días</div>
      </div>
      <div class="testi-card reveal" style="--delay:.4s">
        <div class="tcard-top">
          <div class="tcard-av av-e">RL</div>
          <div>
            <strong>Roberto Luna</strong>
            <small>Reseller Business – Perú</small>
          </div>
          <div class="tcard-verified"><i class="fas fa-check-circle"></i> Verificado</div>
        </div>
        <div class="tcard-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"Panel de gestión muy completo. Mis clientes nunca tienen problemas. <strong>El uptime del 99% es real.</strong> Llevo un año y no pienso cambiar."</p>
        <div class="tcard-date"><i class="fas fa-calendar-check"></i> Hace 1 semana</div>
      </div>
      <div class="testi-card reveal" style="--delay:.5s">
        <div class="tcard-top">
          <div class="tcard-av av-f">AG</div>
          <div>
            <strong>Ana García</strong>
            <small>Cliente Básico – Argentina</small>
          </div>
          <div class="tcard-verified"><i class="fas fa-check-circle"></i> Verificado</div>
        </div>
        <div class="tcard-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"Instalé la app en 2 minutos. La interfaz es muy intuitiva y el contenido que busco siempre está disponible. <strong>¡Feliz de haberlo encontrado!</strong>"</p>
        <div class="tcard-date"><i class="fas fa-calendar-check"></i> Hace 2 días</div>
      </div>
    </div>
  </div>
</section>

<!-- ════ PLANES ════ -->
<section class="planes-section" id="planes">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-eyebrow red">Transparencia Total</div>
      <h2>Elige el plan <span class="red">perfecto para ti</span></h2>
      <p>Sin letra pequeña. Sin sorpresas. Cancela cuando quieras.</p>
    </div>

    <!-- URGENCY -->
    <div class="plan-urgency reveal">
      <div class="pu-left">
        <span class="pu-fire">🔥</span>
        <div>
          <strong>Oferta por tiempo limitado</strong>
          <small>¡50% en tu primer mes! La oferta expira en:</small>
        </div>
      </div>
      <div class="countdown-box">
        <div class="cdb-unit"><span id="pcdD">00</span><small>Días</small></div>
        <div class="cdb-sep">:</div>
        <div class="cdb-unit"><span id="pcdH">00</span><small>Hrs</small></div>
        <div class="cdb-sep">:</div>
        <div class="cdb-unit"><span id="pcdM">00</span><small>Min</small></div>
        <div class="cdb-sep">:</div>
        <div class="cdb-unit"><span id="pcdS">00</span><small>Seg</small></div>
      </div>
    </div>

    <!-- TABS -->
    <div class="plan-tabs reveal">
      <button class="ptab active" data-tab="cliente">
        <i class="fas fa-user"></i><span>Para Clientes</span>
      </button>
      <button class="ptab" data-tab="reseller">
        <i class="fas fa-store"></i><span>Para Resellers</span>
        <div class="ptab-badge">Negocio</div>
      </button>
      <button class="ptab" data-tab="super">
        <i class="fas fa-crown"></i><span>Super Reseller</span>
        <div class="ptab-badge gold-badge">Elite</div>
      </button>
    </div>

    <!-- CLIENTE PLANS -->
    <div class="plan-pane active" id="pane-cliente">
      <div class="plans-row">

        <div class="pcard reveal">
          <div class="pc-header">
            <div class="pc-icon"><i class="fas fa-user"></i></div>
            <h3>Básico</h3>
            <p>Ideal para uso personal</p>
          </div>
          <div class="pc-price">
            <span class="pc-old">$10</span>
            <div class="pc-current">
              <span class="pc-dollar">$</span>
              <span class="pc-amount">5</span>
              <span class="pc-per">/mes</span>
            </div>
            <div class="pc-save">Ahorras 50%</div>
          </div>
          <ul class="pc-feats">
            <li class="ok"><i class="fas fa-check"></i> 1 Dispositivo Android</li>
            <li class="ok"><i class="fas fa-check"></i> Calidad HD 720p</li>
            <li class="ok"><i class="fas fa-check"></i> 1,000+ Canales</li>
            <li class="ok"><i class="fas fa-check"></i> Soporte básico</li>
            <li class="no"><i class="fas fa-times"></i> Sin VOD</li>
            <li class="no"><i class="fas fa-times"></i> Sin multi-pantalla</li>
          </ul>
          <a href="#contacto" class="pc-btn">Obtener Básico <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="pcard popular-pcard reveal" style="--delay:.1s">
          <div class="pop-ribbon">🔥 MÁS POPULAR</div>
          <div class="pc-header">
            <div class="pc-icon gold-ic"><i class="fas fa-star"></i></div>
            <h3>Premium</h3>
            <p>La mejor relación calidad-precio</p>
          </div>
          <div class="pc-price">
            <span class="pc-old">$20</span>
            <div class="pc-current">
              <span class="pc-dollar">$</span>
              <span class="pc-amount">10</span>
              <span class="pc-per">/mes</span>
            </div>
            <div class="pc-save">Ahorras 50%</div>
          </div>
          <ul class="pc-feats">
            <li class="ok"><i class="fas fa-check"></i> 2 Dispositivos Android</li>
            <li class="ok"><i class="fas fa-check"></i> Calidad Full HD 1080p</li>
            <li class="ok"><i class="fas fa-check"></i> 5,000+ Canales</li>
            <li class="ok"><i class="fas fa-check"></i> VOD incluido</li>
            <li class="ok"><i class="fas fa-check"></i> Soporte prioritario</li>
            <li class="no"><i class="fas fa-times"></i> Sin multi-pantalla</li>
          </ul>
          <a href="#contacto" class="pc-btn pop-btn">Obtener Premium <i class="fas fa-arrow-right"></i></a>
          <div class="pc-note"><i class="fas fa-users"></i> 68% de nuestros clientes elige este</div>
        </div>

        <div class="pcard reveal" style="--delay:.2s">
          <div class="pc-header">
            <div class="pc-icon red-ic"><i class="fas fa-gem"></i></div>
            <h3>VIP</h3>
            <p>Para los que quieren todo</p>
          </div>
          <div class="pc-price">
            <span class="pc-old">$40</span>
            <div class="pc-current">
              <span class="pc-dollar">$</span>
              <span class="pc-amount">20</span>
              <span class="pc-per">/mes</span>
            </div>
            <div class="pc-save">Ahorras 50%</div>
          </div>
          <ul class="pc-feats">
            <li class="ok"><i class="fas fa-check"></i> 4 Dispositivos Android</li>
            <li class="ok"><i class="fas fa-check"></i> Calidad 4K Ultra HD</li>
            <li class="ok"><i class="fas fa-check"></i> 10,000+ Canales</li>
            <li class="ok"><i class="fas fa-check"></i> VOD completo</li>
            <li class="ok"><i class="fas fa-check"></i> Multi-pantalla</li>
            <li class="ok"><i class="fas fa-check"></i> Soporte VIP 24/7</li>
          </ul>
          <a href="#contacto" class="pc-btn">Obtener VIP <i class="fas fa-arrow-right"></i></a>
        </div>

      </div>
    </div>

    <!-- RESELLER PLANS -->
    <div class="plan-pane" id="pane-reseller">
      <div class="reseller-banner reveal">
        <i class="fas fa-store"></i>
        <div>
          <strong>¿Quieres ganar dinero con WEBPRO STUDIO?</strong>
          <p>Conviértete en Reseller y vende accesos a tus propios clientes. Sin inversión inicial enorme.</p>
        </div>
        <div class="rb-stat"><span>Promedio de ganancias</span><strong>$300–$600/mes</strong></div>
      </div>
      <div class="plans-row">

        <div class="pcard reveal">
          <div class="pc-header">
            <div class="pc-icon blue-ic"><i class="fas fa-store"></i></div>
            <h3>Starter</h3>
            <p>Para comenzar tu negocio</p>
          </div>
          <div class="pc-price">
            <div class="pc-current">
              <span class="pc-dollar">$</span><span class="pc-amount">30</span><span class="pc-per">/mes</span>
            </div>
          </div>
          <ul class="pc-feats">
            <li class="ok"><i class="fas fa-check"></i> 10 Créditos incluidos</li>
            <li class="ok"><i class="fas fa-check"></i> Panel de gestión</li>
            <li class="ok"><i class="fas fa-check"></i> Crear/eliminar clientes</li>
            <li class="ok"><i class="fas fa-check"></i> Soporte dedicado</li>
            <li class="ok"><i class="fas fa-check"></i> Comisión 20%</li>
            <li class="no"><i class="fas fa-times"></i> Sin marca blanca</li>
          </ul>
          <a href="#contacto" class="pc-btn blue-btn">Ser Reseller Starter <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="pcard popular-pcard reveal" style="--delay:.1s">
          <div class="pop-ribbon">⭐ RECOMENDADO</div>
          <div class="pc-header">
            <div class="pc-icon gold-ic"><i class="fas fa-store-alt"></i></div>
            <h3>Pro</h3>
            <p>El favorito de los resellers</p>
          </div>
          <div class="pc-price">
            <div class="pc-current">
              <span class="pc-dollar">$</span><span class="pc-amount">60</span><span class="pc-per">/mes</span>
            </div>
          </div>
          <ul class="pc-feats">
            <li class="ok"><i class="fas fa-check"></i> 25 Créditos incluidos</li>
            <li class="ok"><i class="fas fa-check"></i> Panel avanzado</li>
            <li class="ok"><i class="fas fa-check"></i> Gestión completa</li>
            <li class="ok"><i class="fas fa-check"></i> Soporte 24/7</li>
            <li class="ok"><i class="fas fa-check"></i> Comisión 30%</li>
            <li class="ok"><i class="fas fa-check"></i> Estadísticas avanzadas</li>
          </ul>
          <a href="#contacto" class="pc-btn pop-btn">Ser Reseller Pro <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="pcard reveal" style="--delay:.2s">
          <div class="pc-header">
            <div class="pc-icon blue-ic"><i class="fas fa-building"></i></div>
            <h3>Business</h3>
            <p>Para distribuidores serios</p>
          </div>
          <div class="pc-price">
            <div class="pc-current">
              <span class="pc-dollar">$</span><span class="pc-amount">100</span><span class="pc-per">/mes</span>
            </div>
          </div>
          <ul class="pc-feats">
            <li class="ok"><i class="fas fa-check"></i> 50 Créditos incluidos</li>
            <li class="ok"><i class="fas fa-check"></i> Panel empresarial</li>
            <li class="ok"><i class="fas fa-check"></i> API de integración</li>
            <li class="ok"><i class="fas fa-check"></i> Soporte VIP exclusivo</li>
            <li class="ok"><i class="fas fa-check"></i> Comisión 40%</li>
            <li class="ok"><i class="fas fa-check"></i> Marca blanca incluida</li>
          </ul>
          <a href="#contacto" class="pc-btn blue-btn">Ser Business <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>

    <!-- SUPER RESELLER PLANS -->
    <div class="plan-pane" id="pane-super">
      <div class="super-banner reveal">
        <div class="sb-crown">♛</div>
        <div>
          <strong>Nivel Máximo: Super Reseller</strong>
          <p>Crea tu propia red de resellers. Establece tus propios precios. Ganancias ilimitadas.</p>
        </div>
        <div class="rb-stat gold-stat"><span>Potencial de ingresos</span><strong>$800–$2,000+/mes</strong></div>
      </div>
      <div class="plans-row two-col">

        <div class="pcard super-pcard reveal">
          <div class="crown-bg">♛</div>
          <div class="pc-header">
            <div class="pc-icon crown-ic"><i class="fas fa-crown"></i></div>
            <h3>Super Reseller</h3>
            <p>Distribuidor con red propia</p>
          </div>
          <div class="pc-price">
            <div class="pc-current">
              <span class="pc-dollar">$</span><span class="pc-amount">200</span><span class="pc-per">/mes</span>
            </div>
          </div>
          <ul class="pc-feats">
            <li class="ok"><i class="fas fa-check"></i> 100 Créditos incluidos</li>
            <li class="ok"><i class="fas fa-check"></i> Crear Resellers propios</li>
            <li class="ok"><i class="fas fa-check"></i> Panel Master completo</li>
            <li class="ok"><i class="fas fa-check"></i> Control de precios propio</li>
            <li class="ok"><i class="fas fa-check"></i> Comisión 50%</li>
            <li class="ok"><i class="fas fa-check"></i> Soporte VIP dedicado</li>
            <li class="ok"><i class="fas fa-check"></i> Marca blanca premium</li>
            <li class="ok"><i class="fas fa-check"></i> Reportes en tiempo real</li>
          </ul>
          <a href="#contacto" class="pc-btn super-btn">Ser Super Reseller <i class="fas fa-arrow-right"></i></a>
        </div>

        <div class="pcard super-pcard elite-pcard reveal" style="--delay:.15s">
          <div class="pop-ribbon elite-ribbon"><i class="fas fa-gem"></i> ÉLITE MÁXIMO</div>
          <div class="crown-bg">♛</div>
          <div class="pc-header">
            <div class="pc-icon diamond-ic"><i class="fas fa-gem"></i></div>
            <h3>Super Reseller Élite</h3>
            <p>La cima del negocio</p>
          </div>
          <div class="pc-price">
            <div class="pc-current">
              <span class="pc-dollar">$</span><span class="pc-amount">400</span><span class="pc-per">/mes</span>
            </div>
          </div>
          <ul class="pc-feats">
            <li class="ok"><i class="fas fa-check"></i> Créditos ILIMITADOS</li>
            <li class="ok"><i class="fas fa-check"></i> Distribución total sin límites</li>
            <li class="ok"><i class="fas fa-check"></i> Panel Master Pro</li>
            <li class="ok"><i class="fas fa-check"></i> Precios 100% personalizables</li>
            <li class="ok"><i class="fas fa-check"></i> Comisión 60%</li>
            <li class="ok"><i class="fas fa-check"></i> Línea directa 24/7</li>
            <li class="ok"><i class="fas fa-check"></i> App con tu propia marca</li>
            <li class="ok"><i class="fas fa-check"></i> Acceso anticipado a features</li>
          </ul>
          <a href="#contacto" class="pc-btn elite-btn">Ser Élite <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>

    <!-- GARANTÍA -->
    <div class="guarantee-bar reveal">
      <div class="gb-icon"><i class="fas fa-award"></i></div>
      <div class="gb-text">
        <strong>Garantía de Satisfacción</strong>
        <p>Si no estás satisfecho en los primeros 7 días, te devolvemos tu dinero. Sin preguntas.</p>
      </div>
      <div class="gb-badge">
        <div class="gb-seal">
          <i class="fas fa-shield-alt"></i>
          <span>7 DÍAS</span>
          <small>GARANTÍA</small>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ════ FAQ ════ -->
<section class="faq-section" id="faq">
  <div class="container">
    <div class="faq-layout">
      <div class="faq-left reveal">
        <div class="section-eyebrow red">Preguntas Frecuentes</div>
        <h2>Tenemos las<br><span class="red">respuestas</span></h2>
        <p>¿No encuentras lo que buscas? Contáctanos directamente.</p>
        <a href="https://wa.me/<?= $whatsapp ?>" class="btn-faq-contact" target="_blank">
          <i class="fab fa-whatsapp"></i> Preguntar por WhatsApp
        </a>
      </div>
      <div class="faq-right">
        <div class="faq-item reveal">
          <div class="faq-q"><span>¿Es legal usar WEBPRO STUDIO?</span><i class="fas fa-plus"></i></div>
          <div class="faq-a">Sí. WEBPRO STUDIO es una aplicación legal de streaming. Trabajamos con proveedores de contenido autorizados para ofrecer la mejor experiencia.</div>
        </div>
        <div class="faq-item reveal">
          <div class="faq-q"><span>¿Funciona en mi teléfono Android?</span><i class="fas fa-plus"></i></div>
          <div class="faq-a">WEBPRO STUDIO es compatible con Android 5.0 o superior. Funciona en smartphones y tablets. Solo necesitas instalar el APK que te proporcionamos.</div>
        </div>
        <div class="faq-item reveal">
          <div class="faq-q"><span>¿Cómo recibo mis accesos después de pagar?</span><i class="fas fa-plus"></i></div>
          <div class="faq-a">Una vez realizado el pago, recibirás tus credenciales de acceso en máximo 30 minutos por WhatsApp o Telegram. El proceso es rápido y automatizado.</div>
        </div>
        <div class="faq-item reveal">
          <div class="faq-q"><span>¿Qué métodos de pago aceptan?</span><i class="fas fa-plus"></i></div>
          <div class="faq-a">Aceptamos transferencias bancarias, PayPal, Zelle, Binance Pay, y efectivo en algunas zonas. Contáctanos para confirmar el método disponible en tu país.</div>
        </div>
        <div class="faq-item reveal">
          <div class="faq-q"><span>¿Puedo convertirme en reseller sin experiencia?</span><i class="fas fa-plus"></i></div>
          <div class="faq-a">¡Absolutamente! No necesitas experiencia técnica. Te proporcionamos capacitación completa, panel fácil de usar y soporte continuo para que tu negocio despegue.</div>
        </div>
        <div class="faq-item reveal">
          <div class="faq-q"><span>¿Hay garantía si no funciona?</span><i class="fas fa-plus"></i></div>
          <div class="faq-a">Sí. Ofrecemos 7 días de garantía de satisfacción. Si por alguna razón no quedas conforme, te reembolsamos el 100% de tu dinero sin preguntas.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════ FINAL CTA ════ -->
<section class="final-cta" id="contacto">
  <div class="fcta-particles"></div>
  <div class="container">
    <div class="fcta-content reveal">
      <div class="fcta-logo">
        <div class="fcta-yt">
          <i class="fab fa-youtube"></i>
          <span class="fcta-crown">♛</span>
        </div>
      </div>
      <h2>¿Listo para empezar?</h2>
      <p>Únete a más de <strong>10,000 usuarios</strong> que ya disfrutan del mejor streaming de Android</p>

      <div class="fcta-btns">
        <a href="<?= $download_url ?>" class="fcta-main">
          <div class="fcta-glow"></div>
          <i class="fab fa-android"></i>
          <div>
            <small>Completamente Gratis</small>
            <strong>Descargar WEBPRO STUDIO</strong>
          </div>
          <i class="fas fa-arrow-down"></i>
        </a>
        <a href="#planes" class="fcta-sec">
          <i class="fas fa-crown"></i>
          <div>
            <small>Desde $5/mes</small>
            <strong>Ver Planes Premium</strong>
          </div>
        </a>
      </div>

      <div class="fcta-contact-row">
        <span>¿Tienes dudas? Contáctanos:</span>
        <a href="https://wa.me/<?= $whatsapp ?>" class="fcc-btn wa" target="_blank">
          <i class="fab fa-whatsapp"></i> WhatsApp
        </a>
        <a href="<?= $telegram ?>" class="fcc-btn tg" target="_blank">
          <i class="fab fa-telegram"></i> Telegram
        </a>
        <a href="mailto:<?= $email ?>" class="fcc-btn em">
          <i class="fas fa-envelope"></i> Email
        </a>
      </div>

      <div class="fcta-trust">
        <span><i class="fas fa-shield-alt"></i> 100% Seguro</span>
        <span><i class="fas fa-award"></i> Garantía 7 días</span>
        <span><i class="fab fa-android"></i> Solo Android</span>
        <span><i class="fas fa-headset"></i> Soporte 24/7</span>
      </div>
    </div>
  </div>
</section>

<!-- ════ FOOTER ════ -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="fg-brand">
        <div class="fg-logo">
          <div class="fgl-icon"><i class="fab fa-youtube"></i><span>♛</span></div>
          <div><span class="fgl-w">WEB</span><span class="fgl-r">PRO</span><small>STUDIO</small></div>
        </div>
        <p>La plataforma de streaming definitiva para Android. Tu Mundo. Tus Videos.</p>
        <div class="fg-social">
          <a href="https://wa.me/<?= $whatsapp ?>" target="_blank"><i class="fab fa-whatsapp"></i></a>
          <a href="<?= $telegram ?>" target="_blank"><i class="fab fa-telegram"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-tiktok"></i></a>
        </div>
      </div>
      <div class="fg-col">
        <h5>Navegación</h5>
        <a href="#inicio">Inicio</a>
        <a href="#como-funciona">Cómo Funciona</a>
        <a href="#planes">Planes</a>
        <a href="#testimonios">Reviews</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="fg-col">
        <h5>Planes</h5>
        <a href="#planes">Cliente Básico</a>
        <a href="#planes">Cliente Premium</a>
        <a href="#planes">Cliente VIP</a>
        <a href="#planes">Reseller</a>
        <a href="#planes">Super Reseller Élite</a>
      </div>
      <div class="fg-col">
        <h5>Descarga</h5>
        <a href="<?= $download_url ?>" class="fg-dl-btn">
          <i class="fab fa-android"></i>
          <div><small>APK <?= $version ?></small><strong>Descargar Gratis</strong></div>
        </a>
        <div class="fg-dl-info">
          <span><i class="fas fa-hdd"></i> ~25 MB</span>
          <span><i class="fas fa-shield-alt"></i> Verificado</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <?= date('Y') ?> WEBPRO STUDIO. Todos los derechos reservados.</p>
      <div><a href="#">Términos</a><a href="#">Privacidad</a></div>
    </div>
  </div>
</footer>

<!-- ════ STICKY CTA ════ -->
<div class="sticky-cta" id="stickyCta">
  <div class="sc-left">
    <div class="sc-logo"><span class="scl-w">WEB</span><span class="scl-r">PRO</span></div>
    <div class="sc-info">
      <strong>¡Oferta activa!</strong>
      <small>Primer mes al 50% OFF</small>
    </div>
  </div>
  <a href="<?= $download_url ?>" class="sc-btn">
    <i class="fab fa-android"></i> Descargar Gratis
  </a>
</div>

<!-- SCROLL TOP -->
<button class="scroll-top-btn" id="scrollTopBtn"><i class="fas fa-chevron-up"></i></button>

<script src="assets/js/main.js"></script>
</body>
</html>
