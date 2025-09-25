function loadTrackingScripts() {
  // Google Analytics
  const gaScript = document.createElement('script');
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID';
  gaScript.async = true;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');

  // Meta Pixel and other scripts can be added here too
}

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true'); // Permanent consent
  document.getElementById('cookie-banner').style.display = 'none';
  loadTrackingScripts();
}

function declineCookies() {
  sessionStorage.setItem('cookiesDeclined', 'true'); // Session-only decline
  document.getElementById('cookie-banner').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  const cookiesDeclined = sessionStorage.getItem('cookiesDeclined');

  if (cookiesAccepted === 'true') {
    loadTrackingScripts(); // Already accepted before
  } else if (!cookiesDeclined) {
    document.getElementById('cookie-banner').style.display = 'block'; // Show banner
  }

  document.getElementById('accept')?.addEventListener('click', acceptCookies);
  document.getElementById('decline')?.addEventListener('click', declineCookies);
});






// cookie-banner.js
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.createElement("div");
  banner.classList.add("cookie-banner");
  banner.innerHTML = `
    <p>
      🍪 We use cookies to improve your experience and to analyze traffic. We also use cookies for marketing via 
      <strong>Google Analytics</strong>, <strong>Facebook Pixel</strong>, and <strong>LinkedIn Insight Tag</strong>. 
      By clicking "Accept", you consent to the use of all cookies. 
      Read our <a href="privacy.html" target="_blank">Privacy Policy</a> and 
      <a href="terms.html" target="_blank">Terms of Use</a>.
    </p>
    <div class="cookie-buttons">
      <button id="accept-cookies">Accept</button>
      <button id="decline-cookies">Decline</button>
    </div>
  `;

  // ✅ Only trigger if no choice yet
  if (!localStorage.getItem("cookiesDecision")) {
    let bannerShown = false;

    window.addEventListener("scroll", function onScrollTrigger() {
      if (window.scrollY > 150 && !bannerShown) {
        bannerShown = true;
        document.body.appendChild(banner);
        window.removeEventListener("scroll", onScrollTrigger);
      }
    });
  }

  // ✅ Accept & Decline Handlers
  document.addEventListener("click", function (e) {
    if (e.target.id === "accept-cookies") {
      localStorage.setItem("cookiesDecision", "accepted");
      banner.remove();
      loadTrackingScripts();
    }

    if (e.target.id === "decline-cookies") {
      localStorage.setItem("cookiesDecision", "declined");
      banner.remove();
      // ❌ No tracking scripts loaded
    }
  });

  // ✅ Load tracking scripts if accepted
  function loadTrackingScripts() {
    // Google Analytics
    const ga = document.createElement('script');
    ga.setAttribute('async', '');
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // ← Replace
    document.head.appendChild(ga);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // ← Replace

    // Facebook Pixel
    const fb = document.createElement('script');
    fb.innerHTML = `
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'YOUR_PIXEL_ID');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fb);

    // LinkedIn Insight
    const li = document.createElement('script');
    li.innerHTML = `
      _linkedin_partner_id = "YOUR_LINKEDIN_ID";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      (function(){
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);
      })();
    `;
    document.head.appendChild(li);
  }
});