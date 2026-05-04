<?php
$app_name = "WEBPRO STUDIO";
$tagline = "Tu Mundo. Tus Videos.";
$version = "v2.5.0";
$download_url = "#download"; // Cambiar por el link real de descarga APK
$whatsapp_number = ""; // Número de WhatsApp para contacto
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= $app_name ?> - La mejor plataforma de streaming para Android. <?= $tagline ?>">
    <meta name="theme-color" content="#FF0000">
    <title><?= $app_name ?> - <?= $tagline ?></title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Oswald:wght@400;500;600;700&family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<!-- Particles Background -->
<div id="particles"></div>

<!-- ============ NAVBAR ============ -->
<nav class="navbar" id="navbar">
    <div class="nav-container">
        <div class="nav-logo">
            <div class="logo-icon">
                <i class="fab fa-youtube"></i>
                <span class="crown">♛</span>
            </div>
            <div class="logo-text">
                <span class="web">WEB</span><span class="pro">PRO</span>
                <small>STUDIO</small>
            </div>
        </div>
        <ul class="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#caracteristicas">Características</a></li>
            <li><a href="#planes">Planes</a></li>
            <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="<?= $download_url ?>" class="btn-nav">
            <i class="fab fa-android"></i> Descargar
        </a>
        <button class="hamburger" id="hamburger">
            <span></span><span></span><span></span>
        </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
        <a href="#inicio">Inicio</a>
        <a href="#caracteristicas">Características</a>
        <a href="#planes">Planes</a>
        <a href="#contacto">Contacto</a>
        <a href="<?= $download_url ?>" class="btn-mobile-download">
            <i class="fab fa-android"></i> Descargar APK
        </a>
    </div>
</nav>

<!-- ============ HERO SECTION ============ -->
<section class="hero" id="inicio">
    <div class="hero-bg-overlay"></div>
    <div class="hero-content">
        <div class="hero-badge">
            <i class="fab fa-android"></i> Solo para Android
        </div>
        <div class="hero-logo-wrap">
            <div class="hero-logo-icon">
                <div class="yt-icon">
                    <div class="yt-box">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="crown-hero">♛</div>
                </div>
            </div>
        </div>
        <h1 class="hero-title">
            <span class="title-web">WEB</span><span class="title-pro">PRO</span>
            <span class="title-studio">STUDIO</span>
        </h1>
        <p class="hero-tagline">• TU MUNDO. TUS VIDEOS. •</p>
        <p class="hero-desc">
            La plataforma de streaming definitiva para Android. Disfruta de contenido ilimitado,
            calidad HD y la mejor experiencia visual en tu dispositivo.
        </p>
        <div class="hero-version">
            <span><i class="fas fa-tag"></i> Versión <?= $version ?></span>
            <span><i class="fas fa-shield-alt"></i> 100% Seguro</span>
            <span><i class="fas fa-bolt"></i> Alta Velocidad</span>
        </div>
        <div class="hero-btns">
            <a href="<?= $download_url ?>" class="btn-primary" id="download">
                <i class="fab fa-android"></i>
                <div>
                    <small>Descarga Gratis</small>
                    <strong>Descargar APK</strong>
                </div>
            </a>
            <a href="#planes" class="btn-secondary">
                <i class="fas fa-crown"></i>
                <div>
                    <small>Ver todos</small>
                    <strong>Nuestros Planes</strong>
                </div>
            </a>
        </div>
        <div class="hero-stats">
            <div class="stat">
                <span class="stat-num">10K+</span>
                <span class="stat-label">Usuarios</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
                <span class="stat-num">50K+</span>
                <span class="stat-label">Canales</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
                <span class="stat-num">4.9★</span>
                <span class="stat-label">Calificación</span>
            </div>
        </div>
    </div>
    <div class="hero-phone">
        <div class="phone-mockup">
            <div class="phone-screen">
                <div class="phone-notch"></div>
                <div class="phone-ui">
                    <div class="phone-header">
                        <div class="phone-logo-mini">
                            <span class="mini-web">WEB</span><span class="mini-pro">PRO</span>
                        </div>
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="phone-banner">
                        <div class="banner-content">
                            <span class="banner-tag">EN VIVO</span>
                            <p>Canal Principal</p>
                        </div>
                        <div class="banner-play"><i class="fas fa-play"></i></div>
                    </div>
                    <div class="phone-grid">
                        <div class="mini-card">
                            <div class="mini-thumb c1"></div>
                            <div class="mini-info">
                                <div class="mini-title"></div>
                                <div class="mini-sub"></div>
                            </div>
                        </div>
                        <div class="mini-card">
                            <div class="mini-thumb c2"></div>
                            <div class="mini-info">
                                <div class="mini-title"></div>
                                <div class="mini-sub"></div>
                            </div>
                        </div>
                        <div class="mini-card">
                            <div class="mini-thumb c3"></div>
                            <div class="mini-info">
                                <div class="mini-title"></div>
                                <div class="mini-sub"></div>
                            </div>
                        </div>
                        <div class="mini-card">
                            <div class="mini-thumb c4"></div>
                            <div class="mini-info">
                                <div class="mini-title"></div>
                                <div class="mini-sub"></div>
                            </div>
                        </div>
                    </div>
                    <div class="phone-nav-bar">
                        <i class="fas fa-home"></i>
                        <i class="fas fa-compass"></i>
                        <i class="fas fa-plus-circle"></i>
                        <i class="fas fa-bell"></i>
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="scroll-indicator">
        <span>Desliza hacia abajo</span>
        <div class="scroll-arrow"></div>
    </div>
</section>

<!-- ============ FEATURES ============ -->
<section class="features" id="caracteristicas">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">¿Por qué elegirnos?</span>
            <h2>Características <span class="red">Premium</span></h2>
            <p>Todo lo que necesitas en una sola aplicación</p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon red-icon">
                    <i class="fas fa-tv"></i>
                </div>
                <h3>Streaming HD</h3>
                <p>Disfruta contenido en alta definición con la mejor calidad de imagen disponible.</p>
            </div>
            <div class="feature-card featured">
                <div class="feature-badge">Popular</div>
                <div class="feature-icon gold-icon">
                    <i class="fas fa-crown"></i>
                </div>
                <h3>Contenido Exclusivo</h3>
                <p>Accede a canales y contenido exclusivo disponible solo para miembros premium.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon red-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <h3>Ultra Rápido</h3>
                <p>Tecnología de streaming optimizada para una reproducción sin cortes ni buffering.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon red-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>100% Seguro</h3>
                <p>Tu privacidad y seguridad son nuestra prioridad. Conexión cifrada siempre.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon red-icon">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <h3>Solo Android</h3>
                <p>Aplicación nativa optimizada exclusivamente para dispositivos Android.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon red-icon">
                    <i class="fas fa-headset"></i>
                </div>
                <h3>Soporte 24/7</h3>
                <p>Equipo de soporte disponible las 24 horas para ayudarte cuando lo necesites.</p>
            </div>
        </div>
    </div>
</section>

<!-- ============ ANDROID SECTION ============ -->
<section class="android-section">
    <div class="container">
        <div class="android-content">
            <div class="android-text">
                <div class="android-badge">
                    <i class="fab fa-android"></i> Exclusivo Android
                </div>
                <h2>Diseñado para <span class="red">Android</span></h2>
                <p>WEBPRO STUDIO está optimizado específicamente para dispositivos Android, garantizando el mejor rendimiento, menor consumo de batería y una experiencia de usuario fluida.</p>
                <ul class="android-list">
                    <li><i class="fas fa-check-circle"></i> Compatible con Android 5.0+</li>
                    <li><i class="fas fa-check-circle"></i> Optimizado para todos los tamaños de pantalla</li>
                    <li><i class="fas fa-check-circle"></i> Bajo consumo de datos</li>
                    <li><i class="fas fa-check-circle"></i> Modo ahorro de batería</li>
                    <li><i class="fas fa-check-circle"></i> Actualizaciones automáticas</li>
                </ul>
                <a href="<?= $download_url ?>" class="btn-android">
                    <i class="fab fa-android"></i> Descargar para Android
                </a>
            </div>
            <div class="android-visual">
                <div class="android-robot">
                    <div class="robot-head">
                        <div class="robot-antenna left"></div>
                        <div class="robot-antenna right"></div>
                        <div class="robot-face">
                            <div class="robot-eye left"></div>
                            <div class="robot-eye right"></div>
                        </div>
                    </div>
                    <div class="robot-body">
                        <div class="robot-screen">
                            <div class="screen-logo">
                                <span class="sl-web">WEB</span><span class="sl-pro">PRO</span>
                            </div>
                            <div class="screen-play"><i class="fas fa-play"></i></div>
                        </div>
                        <div class="robot-arm left"></div>
                        <div class="robot-arm right"></div>
                    </div>
                    <div class="robot-legs">
                        <div class="robot-leg left"></div>
                        <div class="robot-leg right"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============ PLANES ============ -->
<section class="planes" id="planes">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">Precios y Planes</span>
            <h2>Elige tu <span class="red">Plan</span></h2>
            <p>Planes diseñados para todos: usuarios, revendedores y distribuidores</p>
        </div>

        <!-- Tabs -->
        <div class="plan-tabs">
            <button class="tab-btn active" data-tab="cliente">
                <i class="fas fa-user"></i> Cliente
            </button>
            <button class="tab-btn" data-tab="reseller">
                <i class="fas fa-store"></i> Reseller
            </button>
            <button class="tab-btn" data-tab="super-reseller">
                <i class="fas fa-crown"></i> Super Reseller
            </button>
        </div>

        <!-- PLANES CLIENTE -->
        <div class="plan-content active" id="tab-cliente">
            <div class="plans-grid">
                <div class="plan-card">
                    <div class="plan-header">
                        <div class="plan-icon"><i class="fas fa-user"></i></div>
                        <h3>Básico</h3>
                        <div class="plan-price">
                            <span class="currency">$</span>
                            <span class="amount">5</span>
                            <span class="period">/mes</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> 1 Dispositivo</li>
                        <li><i class="fas fa-check"></i> Calidad HD 720p</li>
                        <li><i class="fas fa-check"></i> 1,000+ Canales</li>
                        <li><i class="fas fa-check"></i> Soporte básico</li>
                        <li class="disabled"><i class="fas fa-times"></i> Sin VOD</li>
                        <li class="disabled"><i class="fas fa-times"></i> Sin multi-pantalla</li>
                    </ul>
                    <a href="#contacto" class="btn-plan">Obtener Plan</a>
                </div>

                <div class="plan-card popular">
                    <div class="popular-badge"><i class="fas fa-fire"></i> MÁS POPULAR</div>
                    <div class="plan-header">
                        <div class="plan-icon gold"><i class="fas fa-star"></i></div>
                        <h3>Premium</h3>
                        <div class="plan-price">
                            <span class="currency">$</span>
                            <span class="amount">10</span>
                            <span class="period">/mes</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> 2 Dispositivos</li>
                        <li><i class="fas fa-check"></i> Calidad Full HD 1080p</li>
                        <li><i class="fas fa-check"></i> 5,000+ Canales</li>
                        <li><i class="fas fa-check"></i> VOD incluido</li>
                        <li><i class="fas fa-check"></i> Soporte prioritario</li>
                        <li class="disabled"><i class="fas fa-times"></i> Sin multi-pantalla</li>
                    </ul>
                    <a href="#contacto" class="btn-plan popular-btn">Obtener Plan</a>
                </div>

                <div class="plan-card">
                    <div class="plan-header">
                        <div class="plan-icon red-pl"><i class="fas fa-gem"></i></div>
                        <h3>VIP</h3>
                        <div class="plan-price">
                            <span class="currency">$</span>
                            <span class="amount">20</span>
                            <span class="period">/mes</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> 4 Dispositivos</li>
                        <li><i class="fas fa-check"></i> Calidad 4K Ultra HD</li>
                        <li><i class="fas fa-check"></i> 10,000+ Canales</li>
                        <li><i class="fas fa-check"></i> VOD completo</li>
                        <li><i class="fas fa-check"></i> Multi-pantalla</li>
                        <li><i class="fas fa-check"></i> Soporte 24/7 VIP</li>
                    </ul>
                    <a href="#contacto" class="btn-plan">Obtener Plan</a>
                </div>
            </div>
        </div>

        <!-- PLANES RESELLER -->
        <div class="plan-content" id="tab-reseller">
            <div class="reseller-info">
                <i class="fas fa-store"></i>
                <p>Como <strong>Reseller</strong> puedes vender créditos a tus propios clientes y ganar comisiones atractivas.</p>
            </div>
            <div class="plans-grid">
                <div class="plan-card reseller-card">
                    <div class="plan-header">
                        <div class="plan-icon blue-icon"><i class="fas fa-store"></i></div>
                        <h3>Reseller Starter</h3>
                        <div class="plan-price">
                            <span class="currency">$</span>
                            <span class="amount">30</span>
                            <span class="period">/mes</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> 10 Créditos incluidos</li>
                        <li><i class="fas fa-check"></i> Panel de gestión</li>
                        <li><i class="fas fa-check"></i> Crear/eliminar clientes</li>
                        <li><i class="fas fa-check"></i> Soporte dedicado</li>
                        <li><i class="fas fa-check"></i> Comisión 20%</li>
                        <li class="disabled"><i class="fas fa-times"></i> Sin marca blanca</li>
                    </ul>
                    <a href="#contacto" class="btn-plan reseller-btn">Ser Reseller</a>
                </div>

                <div class="plan-card popular reseller-card">
                    <div class="popular-badge"><i class="fas fa-fire"></i> RECOMENDADO</div>
                    <div class="plan-header">
                        <div class="plan-icon blue-gold"><i class="fas fa-store-alt"></i></div>
                        <h3>Reseller Pro</h3>
                        <div class="plan-price">
                            <span class="currency">$</span>
                            <span class="amount">60</span>
                            <span class="period">/mes</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> 25 Créditos incluidos</li>
                        <li><i class="fas fa-check"></i> Panel avanzado</li>
                        <li><i class="fas fa-check"></i> Gestión completa</li>
                        <li><i class="fas fa-check"></i> Soporte prioritario 24/7</li>
                        <li><i class="fas fa-check"></i> Comisión 30%</li>
                        <li><i class="fas fa-check"></i> Estadísticas avanzadas</li>
                    </ul>
                    <a href="#contacto" class="btn-plan popular-btn">Ser Reseller Pro</a>
                </div>

                <div class="plan-card reseller-card">
                    <div class="plan-header">
                        <div class="plan-icon blue-icon"><i class="fas fa-building"></i></div>
                        <h3>Reseller Business</h3>
                        <div class="plan-price">
                            <span class="currency">$</span>
                            <span class="amount">100</span>
                            <span class="period">/mes</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> 50 Créditos incluidos</li>
                        <li><i class="fas fa-check"></i> Panel empresarial</li>
                        <li><i class="fas fa-check"></i> API de integración</li>
                        <li><i class="fas fa-check"></i> Soporte VIP exclusivo</li>
                        <li><i class="fas fa-check"></i> Comisión 40%</li>
                        <li><i class="fas fa-check"></i> Marca blanca incluida</li>
                    </ul>
                    <a href="#contacto" class="btn-plan reseller-btn">Ser Business</a>
                </div>
            </div>
        </div>

        <!-- PLANES SUPER RESELLER -->
        <div class="plan-content" id="tab-super-reseller">
            <div class="reseller-info super-info">
                <i class="fas fa-crown"></i>
                <p>Como <strong>Super Reseller</strong> tienes el máximo nivel: crea tus propios resellers, establece precios y maximiza tus ganancias.</p>
            </div>
            <div class="plans-grid super-grid">
                <div class="plan-card super-card">
                    <div class="crown-deco">♛</div>
                    <div class="plan-header">
                        <div class="plan-icon crown-icon"><i class="fas fa-crown"></i></div>
                        <h3>Super Reseller</h3>
                        <div class="plan-price">
                            <span class="currency">$</span>
                            <span class="amount">200</span>
                            <span class="period">/mes</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> 100 Créditos incluidos</li>
                        <li><i class="fas fa-check"></i> Crear Resellers propios</li>
                        <li><i class="fas fa-check"></i> Panel Master completo</li>
                        <li><i class="fas fa-check"></i> Control de precios</li>
                        <li><i class="fas fa-check"></i> Comisión 50%</li>
                        <li><i class="fas fa-check"></i> Soporte VIP dedicado</li>
                        <li><i class="fas fa-check"></i> Marca blanca premium</li>
                        <li><i class="fas fa-check"></i> Reportes en tiempo real</li>
                    </ul>
                    <a href="#contacto" class="btn-plan super-btn">Ser Super Reseller</a>
                </div>

                <div class="plan-card super-card elite">
                    <div class="popular-badge elite-badge"><i class="fas fa-gem"></i> ÉLITE</div>
                    <div class="crown-deco">♛</div>
                    <div class="plan-header">
                        <div class="plan-icon diamond-icon"><i class="fas fa-gem"></i></div>
                        <h3>Super Reseller Elite</h3>
                        <div class="plan-price">
                            <span class="currency">$</span>
                            <span class="amount">400</span>
                            <span class="period">/mes</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> Créditos ILIMITADOS</li>
                        <li><i class="fas fa-check"></i> Distribución total</li>
                        <li><i class="fas fa-check"></i> Panel Master Pro</li>
                        <li><i class="fas fa-check"></i> Precios personalizables</li>
                        <li><i class="fas fa-check"></i> Comisión 60%</li>
                        <li><i class="fas fa-check"></i> Línea directa 24/7</li>
                        <li><i class="fas fa-check"></i> App personalizada</li>
                        <li><i class="fas fa-check"></i> Acceso anticipado features</li>
                    </ul>
                    <a href="#contacto" class="btn-plan super-btn elite-btn">Ser Élite</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============ CTA DOWNLOAD ============ -->
<section class="cta-download">
    <div class="cta-bg"></div>
    <div class="container">
        <div class="cta-content">
            <div class="cta-icon">
                <i class="fab fa-android"></i>
            </div>
            <h2>Descarga <span>WEBPRO STUDIO</span> Ahora</h2>
            <p>Completamente gratis. Sin registro. Disponible para Android 5.0+</p>
            <div class="cta-info">
                <span><i class="fas fa-file-alt"></i> APK <?= $version ?></span>
                <span><i class="fas fa-hdd"></i> ~25 MB</span>
                <span><i class="fas fa-shield-alt"></i> Libre de virus</span>
            </div>
            <a href="<?= $download_url ?>" class="btn-cta-download">
                <i class="fab fa-android"></i>
                <div>
                    <small>Descarga Gratuita</small>
                    <strong>Obtener APK</strong>
                </div>
                <i class="fas fa-arrow-down arrow-icon"></i>
            </a>
        </div>
    </div>
</section>

<!-- ============ CONTACTO ============ -->
<section class="contacto" id="contacto">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">Estamos aquí para ti</span>
            <h2>¿Tienes <span class="red">Preguntas</span>?</h2>
            <p>Contáctanos y te responderemos a la brevedad</p>
        </div>
        <div class="contact-grid">
            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <h3>WhatsApp</h3>
                <p>Chatea directamente con nuestro equipo de soporte</p>
                <a href="https://wa.me/<?= $whatsapp_number ?>" class="btn-contact whatsapp-btn" target="_blank">
                    <i class="fab fa-whatsapp"></i> Chatear ahora
                </a>
            </div>
            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fab fa-telegram"></i>
                </div>
                <h3>Telegram</h3>
                <p>Únete a nuestro canal oficial de Telegram</p>
                <a href="#" class="btn-contact telegram-btn" target="_blank">
                    <i class="fab fa-telegram"></i> Ir al Canal
                </a>
            </div>
            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <h3>Email</h3>
                <p>Envíanos un correo para consultas de negocios</p>
                <a href="mailto:contacto@webprostudio.com" class="btn-contact email-btn">
                    <i class="fas fa-envelope"></i> Enviar Email
                </a>
            </div>
        </div>
    </div>
</section>

<!-- ============ FOOTER ============ -->
<footer class="footer">
    <div class="container">
        <div class="footer-top">
            <div class="footer-brand">
                <div class="footer-logo">
                    <div class="footer-logo-icon">
                        <i class="fab fa-youtube"></i>
                        <span>♛</span>
                    </div>
                    <div>
                        <span class="f-web">WEB</span><span class="f-pro">PRO</span>
                        <small>STUDIO</small>
                    </div>
                </div>
                <p>La plataforma de streaming definitiva. Tu Mundo. Tus Videos.</p>
                <div class="footer-socials">
                    <a href="#"><i class="fab fa-whatsapp"></i></a>
                    <a href="#"><i class="fab fa-telegram"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                </div>
            </div>
            <div class="footer-links-col">
                <h4>Navegación</h4>
                <ul>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#caracteristicas">Características</a></li>
                    <li><a href="#planes">Planes</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </div>
            <div class="footer-links-col">
                <h4>Planes</h4>
                <ul>
                    <li><a href="#planes">Cliente Básico</a></li>
                    <li><a href="#planes">Cliente Premium</a></li>
                    <li><a href="#planes">Cliente VIP</a></li>
                    <li><a href="#planes">Reseller</a></li>
                    <li><a href="#planes">Super Reseller</a></li>
                </ul>
            </div>
            <div class="footer-links-col">
                <h4>Descargar</h4>
                <a href="<?= $download_url ?>" class="footer-download-btn">
                    <i class="fab fa-android"></i>
                    <div>
                        <small>Android APK</small>
                        <strong>Descargar Gratis</strong>
                    </div>
                </a>
                <div class="footer-version">
                    <i class="fas fa-tag"></i> Versión <?= $version ?>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?= date('Y') ?> WEBPRO STUDIO. Todos los derechos reservados.</p>
            <div class="footer-legal">
                <a href="#">Términos de uso</a>
                <a href="#">Privacidad</a>
            </div>
        </div>
    </div>
</footer>

<!-- Scroll to top -->
<button class="scroll-top" id="scrollTop">
    <i class="fas fa-chevron-up"></i>
</button>

<script src="assets/js/main.js"></script>
</body>
</html>
