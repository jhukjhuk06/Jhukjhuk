document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;
  const intro = document.getElementById("brandIntro");
  const menu = document.getElementById("menuBtn");
  const nav = document.getElementById("navLinks");
  const toast = document.getElementById("toast");
  const plannerEl = document.getElementById("planner");
  const destinationInput = document.getElementById("destination");
  const holidaySearch = document.getElementById("holidaySearch");
  const travelContactModal = document.getElementById("travelContactModal");
  const travelContactClose = document.getElementById("travelContactClose");
  const travelContactTitle = document.getElementById("travelContactTitle");
  const travelEnquiryDestination = document.getElementById("travelEnquiryDestination");
  const travelEnquiryMeta = document.getElementById("travelEnquiryMeta");
  const whatsappLink = travelContactModal?.querySelector(".travel-whatsapp");
  const callLink = travelContactModal?.querySelector(".travel-call");

  let activePackage = "";
  let selectedDestination = "";
  let lastFocusedElement = null;
  let activeModal = null;
  let toastTimer = null;

  // Cinematic brand intro: long enough to feel intentional, short enough not to block the site.
  if (intro) {
    const finishIntro = () => {
      if (intro.classList.contains("done")) return;
      intro.classList.add("done");
      body.classList.remove("locked");
    };
    const introDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 450 : 10000;
    const introVideo = document.getElementById("introCinematicVideo");
    if (introVideo) {
      introVideo.currentTime = 0;
      const playIntroVideo = () => introVideo.play().catch(() => {});
      playIntroVideo();
      document.addEventListener("visibilitychange", () => { if (!document.hidden) playIntroVideo(); }, { passive: true });
    }
    const introTimer = window.setTimeout(finishIntro, introDelay);
    document.getElementById("introSkip")?.addEventListener("click", () => {
      window.clearTimeout(introTimer);
      finishIntro();
    });
    intro.addEventListener("transitionend", () => {
      if (intro.classList.contains("done")) intro.remove();
    }, { once: true });
  } else {
    body.classList.remove("locked");
  }

  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function setBodyLock(locked) {
    body.style.overflow = locked ? "hidden" : "";
  }

  function getFocusable(modal) {
    return [...modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  }

  function openModal(modal, focusSelector) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    if (activeModal && activeModal !== modal) closeModal(activeModal, false);
    activeModal = modal;
    modal.classList.add("is-open", "open");
    modal.setAttribute("aria-hidden", "false");
    setBodyLock(true);
    const target = focusSelector ? modal.querySelector(focusSelector) : getFocusable(modal)[0];
    window.setTimeout(() => target?.focus(), 30);
  }

  function closeModal(modal, restore = true) {
    if (!modal) return;
    modal.classList.remove("is-open", "open");
    modal.setAttribute("aria-hidden", "true");
    if (activeModal === modal) activeModal = null;
    setBodyLock(false);
    if (restore && lastFocusedElement && document.contains(lastFocusedElement)) {
      window.setTimeout(() => lastFocusedElement.focus(), 30);
    }
  }

  function planner(prefill = "") {
    if (prefill && destinationInput) destinationInput.value = prefill;
    plannerEl?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => destinationInput?.focus(), 450);
  }

  menu?.addEventListener("click", () => {
    const open = nav?.classList.toggle("active");
    menu.setAttribute("aria-expanded", String(Boolean(open)));
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("active");
    menu?.setAttribute("aria-expanded", "false");
  }));

  document.getElementById("planTrip")?.addEventListener("click", () => planner());
  document.getElementById("customTrip")?.addEventListener("click", () => planner());

const packageDetails={
"Kerala Escape":{duration:"5 NIGHTS • 6 DAYS",price:"₹18,999",description:"Munnar, Thekkady, Alleppey and Kochi.",days:[["Day 1","Kochi → Munnar","Arrival, transfer to Munnar and hotel check-in."],["Day 2","Munnar Sightseeing","Tea gardens, Mattupetty area and scenic viewpoints."],["Day 3","Munnar → Thekkady","Transfer to Thekkady and leisure/spice market visit."],["Day 4","Thekkady → Alleppey","Proceed to Alleppey and enjoy the backwater atmosphere."],["Day 5","Alleppey → Kochi","Transfer to Kochi with local sightseeing and leisure."],["Day 6","Departure","Airport or railway station transfer after breakfast."]]},
"Kashmir Paradise":{duration:"5 NIGHTS • 6 DAYS",price:"₹21,999",description:"A classic Kashmir holiday through Srinagar, Gulmarg and Pahalgam.",days:[["Day 1","Arrival Srinagar","Airport pickup, hotel/houseboat check-in and leisure."],["Day 2","Srinagar Sightseeing","Mughal gardens, local attractions and optional Shikara ride."],["Day 3","Gulmarg Excursion","Full-day Gulmarg visit with optional Gondola experience."],["Day 4","Srinagar → Pahalgam","Scenic transfer to Pahalgam and leisure."],["Day 5","Pahalgam → Srinagar","Return to Srinagar with shopping/free evening."],["Day 6","Departure","Transfer to Srinagar airport."]]},
"Bali Escape":{duration:"5 NIGHTS • 6 DAYS",price:"₹32,999",description:"A tropical Bali break with beaches, temples and Ubud.",days:[["Day 1","Arrival Bali","Airport transfer, hotel check-in and leisure."],["Day 2","South Bali","Beach areas and selected local sightseeing."],["Day 3","Ubud Experience","Ubud highlights, rice terraces and cultural attractions."],["Day 4","Temple & Sunset","Selected temple tour and sunset experience."],["Day 5","Leisure Day","Free day for optional activities, spa or shopping."],["Day 6","Departure","Hotel checkout and airport transfer."]]},
"Dubai Delight":{duration:"4 NIGHTS • 5 DAYS",price:"₹34,999",description:"Dubai highlights with city sightseeing, desert and marina experiences.",days:[["Day 1","Arrival Dubai","Airport pickup, hotel check-in and leisure."],["Day 2","Dubai City Tour","Major city landmarks and selected attractions."],["Day 3","Desert Safari","Leisure morning followed by desert safari experience."],["Day 4","Dubai Leisure","Shopping, marina area or optional attraction visit."],["Day 5","Departure","Airport transfer for return flight."]]},
"Sikkim Himalayan Escape":{duration:"5 NIGHTS • 6 DAYS",price:"₹16,900",description:"A Himalayan journey through Gangtok and Pelling.",days:[["Day 1","Arrival → Gangtok","Pickup from NJP/Bagdogra and transfer to Gangtok."],["Day 2","Tsomgo Lake Excursion","Visit Tsomgo Lake and nearby attractions subject to permits/weather."],["Day 3","Gangtok Sightseeing","Explore selected monasteries, viewpoints and local attractions."],["Day 4","Gangtok → Pelling","Scenic transfer to Pelling and leisure."],["Day 5","Pelling Sightseeing","Visit waterfalls, monasteries and Himalayan viewpoints."],["Day 6","Departure","Transfer to NJP/Bagdogra."]]},
"Royal Rajasthan":{duration:"5 NIGHTS • 6 DAYS",price:"₹24,999",description:"Royal Rajasthan covering Jaipur, Jodhpur and Udaipur.",days:[["Day 1","Arrival Jaipur","Hotel check-in and evening leisure."],["Day 2","Jaipur Sightseeing","Amber Fort, City Palace area and Hawa Mahal."],["Day 3","Jaipur → Jodhpur","Transfer to Jodhpur and explore the old city."],["Day 4","Jodhpur Sightseeing","Mehrangarh Fort and prominent city landmarks."],["Day 5","Jodhpur → Udaipur","Transfer to Udaipur and evening leisure."],["Day 6","Udaipur & Departure","Selected sightseeing followed by departure transfer."]]},
"Andaman Island Escape":{duration:"5 NIGHTS • 6 DAYS",price:"₹22,999",description:"Island hopping through Port Blair, Havelock and Neil Island.",days:[["Day 1","Arrival Port Blair","Airport pickup, hotel check-in and local sightseeing."],["Day 2","Port Blair → Havelock","Ferry transfer and beach leisure."],["Day 3","Havelock Island","Explore selected beaches and enjoy leisure time."],["Day 4","Havelock → Neil Island","Ferry transfer and Neil Island sightseeing."],["Day 5","Neil → Port Blair","Return ferry to Port Blair and shopping/leisure."],["Day 6","Departure","Transfer to Port Blair airport."]]},
"Uttarakhand Retreat":{duration:"5 NIGHTS • 6 DAYS",price:"₹17,999",description:"Mountains and spirituality across Nainital, Mussoorie and Rishikesh.",days:[["Day 1","Arrival Nainital","Transfer to Nainital and hotel check-in."],["Day 2","Nainital Sightseeing","Lake area, viewpoints and local attractions."],["Day 3","Nainital → Mussoorie","Scenic transfer and evening leisure."],["Day 4","Mussoorie Sightseeing","Explore major local attractions and viewpoints."],["Day 5","Mussoorie → Rishikesh","Transfer to Rishikesh and evening Ganga experience."],["Day 6","Departure","Checkout and onward transfer."]]},
"Singapore City Escape":{duration:"4 NIGHTS • 5 DAYS",price:"₹39,999",description:"A compact Singapore holiday with city icons and Sentosa.",days:[["Day 1","Arrival Singapore","Airport transfer, hotel check-in and leisure."],["Day 2","Singapore City Tour","Explore key city landmarks and neighbourhoods."],["Day 3","Sentosa Experience","Enjoy selected Sentosa attractions and island leisure."],["Day 4","Gardens & Leisure","Visit selected attractions with shopping/free time."],["Day 5","Departure","Airport transfer for return flight."]]},
"Maldives Island Retreat":{duration:"4 NIGHTS • 5 DAYS",price:"₹44,999",description:"A relaxing Maldives resort holiday focused on beaches and leisure.",days:[["Day 1","Arrival Maldives","Airport arrival and speedboat/seaplane transfer to resort."],["Day 2","Island Leisure","Relax on the beach and enjoy resort facilities."],["Day 3","Water Experiences","Optional snorkelling, water sports or excursion."],["Day 4","Relax & Unwind","Free day for spa, beach and sunset experiences."],["Day 5","Departure","Resort checkout and airport transfer."]]},
"Mauritius Tropical Escape":{duration:"5 NIGHTS • 6 DAYS",price:"₹49,999",description:"Mauritius highlights combining island sightseeing and beach time.",days:[["Day 1","Arrival Mauritius","Airport pickup, resort check-in and leisure."],["Day 2","North Island Tour","Explore selected northern attractions and shopping areas."],["Day 3","South Island Tour","Scenic south island sightseeing and viewpoints."],["Day 4","Ile aux Cerfs","Island excursion with beach time and optional activities."],["Day 5","Leisure Day","Relax at resort or choose an optional excursion."],["Day 6","Departure","Airport transfer after checkout."]]},
"Malaysia Discovery":{duration:"5 NIGHTS • 6 DAYS",price:"₹36,999",description:"Malaysia journey through Kuala Lumpur, Genting and Langkawi.",days:[["Day 1","Arrival Kuala Lumpur","Airport pickup, hotel check-in and leisure."],["Day 2","Kuala Lumpur Tour","Explore major landmarks and city attractions."],["Day 3","Genting Excursion","Day trip to Genting Highlands and selected attractions."],["Day 4","Kuala Lumpur → Langkawi","Transfer/flight to Langkawi and hotel check-in."],["Day 5","Langkawi Experience","Island sightseeing and leisure."],["Day 6","Departure","Airport transfer for onward journey."]]}
}


/* Destination explorer */

  const itineraryBackdrop = document.getElementById("itineraryBackdrop");
  const itineraryList = document.getElementById("itineraryList");
  const destinationModal = document.getElementById("destinationModal");
  const destinationModalClose = document.getElementById("destinationModalClose");
  const destinationPlanBtn = document.getElementById("destinationPlanBtn");

  function getPlannerDetails() {
    const month = document.querySelector('#holidaySearch input[type="month"]')?.value || "";
    const travellers = document.getElementById("travellers")?.value || "";
    const budget = document.getElementById("budget")?.value || "";
    const tripStyle = document.getElementById("tripStyle")?.value || "";
    return { destination: destinationInput?.value.trim() || "", month, travellers, budget, tripStyle };
  }

  function monthLabel(value) {
    if (!value) return "Flexible dates";
    const date = new Date(`${value}-01T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  }

  function buildWhatsAppUrl(context = {}) {
    const details = getPlannerDetails();
    const destination = context.destination || details.destination || "a trip";
    const packageName = context.packageName || activePackage;
    const lines = [
      "Hi Jhuk Jhuk Holidays, I would like to plan a trip.",
      packageName ? `Package: ${packageName}` : "",
      `Destination: ${destination}`,
      details.month ? `Travel month: ${monthLabel(details.month)}` : "",
      details.travellers ? `Travellers: ${details.travellers}` : "",
      details.budget && details.budget !== "Any Budget" ? `Budget: ${details.budget}` : "",
      details.tripStyle && details.tripStyle !== "Any Style" ? `Trip style: ${details.tripStyle}` : "",
      "Please share the best options and details."
    ].filter(Boolean);
    return `https://wa.me/918806684300?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function openTravelContact(context = {}) {
    if (!travelContactModal) return;
    if (context.packageName) activePackage = context.packageName;
    const details = getPlannerDetails();
    const label = context.packageName || activePackage || details.destination;
    if (travelContactTitle) travelContactTitle.textContent = label ? `Let's plan ${label}` : "Talk to a Travel Expert";
    if (travelEnquiryDestination) travelEnquiryDestination.textContent = label || "Flexible trip planning";
    if (travelEnquiryMeta) {
      const meta = [details.month ? monthLabel(details.month) : "Flexible dates", details.travellers || "Traveller count flexible", details.budget && details.budget !== "Any Budget" ? details.budget : "Budget flexible", details.tripStyle && details.tripStyle !== "Any Style" ? details.tripStyle : "Any travel style"].join(" • ");
      travelEnquiryMeta.textContent = meta;
    }
    if (whatsappLink) whatsappLink.href = buildWhatsAppUrl(context);
    if (callLink) callLink.setAttribute("aria-label", "Call Jhuk Jhuk Holidays");
    openModal(travelContactModal, "#travelContactClose");
  }

  function closeTravelContact() { closeModal(travelContactModal); }

  holidaySearch?.addEventListener("submit", event => {
    event.preventDefault();
    const details = getPlannerDetails();
    if (!details.destination) {
      notify("Tell us where you want to go first 🌍");
      destinationInput?.focus();
      return;
    }
    openTravelContact({ destination: details.destination });
  });

  document.querySelectorAll(".destination[data-place]").forEach(card => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => openDestinationExplorer(card.dataset.place));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDestinationExplorer(card.dataset.place);
      }
    });
  });

  function openItinerary(name) {
    const pkg = packageDetails[name];
    if (!pkg || !itineraryBackdrop) return;
    activePackage = name;
    document.getElementById("itineraryTitle").textContent = name;
    document.getElementById("itineraryDuration").textContent = pkg.duration;
    document.getElementById("itineraryPrice").textContent = pkg.price;
    document.getElementById("itineraryDescription").textContent = pkg.description;
    itineraryList.innerHTML = pkg.days.map(day => `<div class="day-item"><div class="day-label">${day[0]}</div><div><h4>${day[1]}</h4><p>${day[2]}</p></div></div>`).join("");
    openModal(itineraryBackdrop, "#modalClose");
  }

  function closeItinerary() { closeModal(itineraryBackdrop); }
  document.querySelectorAll(".enquire").forEach(button => button.addEventListener("click", () => openItinerary(button.dataset.name)));
  document.getElementById("modalClose")?.addEventListener("click", closeItinerary);
  document.getElementById("modalCloseBottom")?.addEventListener("click", closeItinerary);
  document.getElementById("enquireNow")?.addEventListener("click", () => {
    closeItinerary();
    window.setTimeout(() => openTravelContact({ packageName: activePackage }), 160);
  });

  document.querySelectorAll(".package-enquire-now").forEach(button => button.addEventListener("click", () => {
    activePackage = button.dataset.name || "";
    openTravelContact({ packageName: activePackage });
  }));

  document.getElementById("travelExpertBtn")?.addEventListener("click", event => {
    event.preventDefault();
    openTravelContact();
  });

  // Contact navigation: open the contact panel instead of following a missing #contact anchor.
  document.querySelector('.nav-links a[href="#contact"]')?.addEventListener("click", event => {
    event.preventDefault();
    nav?.classList.remove("active");
    menu?.setAttribute("aria-expanded", "false");
    openTravelContact();
  });
  travelContactClose?.addEventListener("click", closeTravelContact);
  document.getElementById("footerEnquireBtn")?.addEventListener("click", event => {
    event.preventDefault();
    openTravelContact();
  });

const destinationDetails = {"Kerala":{"tag":"Backwaters • Hills • Culture","desc":"Kerala blends misty tea country, tranquil backwaters, palm-lined beaches and rich local traditions. It is ideal for couples, families and travellers looking for a slower, scenic holiday.","best":"Best for: Nature, couples, families & relaxed holidays","images":["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=85"]},"Kashmir":{"tag":"Valleys • Lakes • Snow","desc":"Kashmir is known for dramatic Himalayan landscapes, Dal Lake, flower-filled gardens and mountain escapes such as Gulmarg and Pahalgam. Every season gives the valley a different personality.","best":"Best for: Honeymoons, snow, scenery & family trips","images":["https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1566837497312-7be4a2b0d67b?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1626621331169-5f34be280ed9?auto=format&fit=crop&w=1000&q=85"]},"Bali":{"tag":"Beaches • Temples • Tropical Life","desc":"Bali combines tropical beaches, spiritual temples, green rice terraces and lively resort areas. It works equally well for honeymooners, friends, wellness escapes and first-time international travellers.","best":"Best for: Couples, beaches, culture & wellness","images":["https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=85"]},"Dubai":{"tag":"Luxury • Desert • Experiences","desc":"Dubai pairs futuristic architecture and luxury shopping with desert adventures, beaches and family attractions. It is a compact destination where sightseeing, entertainment and premium experiences fit easily into one holiday.","best":"Best for: Families, luxury, shopping & entertainment","images":["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85"]},"Sikkim":{"tag":"Himalayas • Monasteries • Lakes","desc":"Sikkim is a peaceful Himalayan escape filled with mountain views, Buddhist monasteries, alpine lakes and winding scenic roads. Gangtok and Pelling make excellent bases for exploring the region.","best":"Best for: Mountains, nature, couples & peaceful trips","images":["https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1581791538302-03537b9c97bf?auto=format&fit=crop&w=1000&q=85"]},"Rajasthan":{"tag":"Forts • Palaces • Desert","desc":"Rajasthan is India's grand stage of forts, palaces, colourful bazaars and desert landscapes. Jaipur, Jodhpur and Udaipur offer a strong mix of heritage, food, architecture and memorable stays.","best":"Best for: Heritage, families, photography & culture","images":["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1000&q=85"]},"Andaman & Nicobar":{"tag":"Islands • Beaches • Blue Water","desc":"The Andaman Islands offer clear water, soft beaches, tropical greenery and relaxed island hopping. Port Blair, Havelock and Neil Island create an easy mix of history, beaches and water experiences.","best":"Best for: Couples, beaches, water activities & families","images":["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85"]},"Uttarakhand":{"tag":"Mountains • Rivers • Spirituality","desc":"Uttarakhand moves from peaceful hill stations to Himalayan landscapes and the spiritual energy of the Ganga. Nainital, Mussoorie and Rishikesh make a versatile itinerary for different travel styles.","best":"Best for: Families, mountains, spirituality & adventure","images":["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85"]},"Singapore":{"tag":"City • Gardens • Entertainment","desc":"Singapore is polished, compact and packed with experiences—from futuristic gardens and skyline views to Sentosa, food districts and family attractions. Its efficient transport makes short holidays especially easy.","best":"Best for: Families, first international trips & city breaks","images":["https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1525625293386-3f8f99389edd8?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=85"]},"Maldives":{"tag":"Resorts • Lagoons • Barefoot Luxury","desc":"The Maldives is built for switching off: turquoise lagoons, white sand, private resorts and spectacular sunsets. Resort selection is the heart of the experience, from romantic villas to family-friendly islands.","best":"Best for: Honeymoons, luxury, beaches & relaxation","images":["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=85"]},"Mauritius":{"tag":"Beaches • Landscapes • Island Culture","desc":"Mauritius combines beautiful beaches with green interiors, waterfalls, viewpoints and a multicultural food scene. It offers more sightseeing variety than a resort-only island holiday.","best":"Best for: Couples, families, beaches & sightseeing","images":["https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85"]},"Malaysia":{"tag":"Cities • Islands • Culture","desc":"Malaysia combines Kuala Lumpur's modern skyline with highland escapes, diverse food and tropical islands such as Langkawi. It is an easy multi-experience destination for couples and families.","best":"Best for: Families, city breaks, food & islands","images":["https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1508062878650-88b52897f298?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=85"]}};
  // V32: destination-specific hidden discoveries from the Jhuk Jhuk Vihar 2027 guide.
  // The content below stays faithful to the supplied guide while presenting it as concise website copy.
  const hiddenGems = {
    "Kerala": {
      intro: "Go beyond Munnar, Alleppey and Kochi into quieter Kerala landscapes, village life and highland stories.",
      hero: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Kanthalloor", "Highland village • 50 km from Munnar", "A misty highland village known for apple, plum and peach orchards, a living barter tradition, sandalwood forests and the ancient Muniyara dolmens.", "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=88"],
        ["Thanneermukkom Backwaters", "12 km from Alleppey", "A quieter backwater landscape where fishermen, duck farmers and coir makers continue everyday local life. Morning country-boat rides reveal flooded paddy fields and seasonal water lilies.", "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1000&q=88"],
        ["Munroe Island", "Near Kollam", "Small canoes replace houseboats as narrow village canals wind beneath coconut palms and mangroves. The guide highlights the silence, village banks and colonial-era Dutch church by Ashtamudi Lake.", "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=88"],
        ["Kolukkumalai Tea Estate", "Accessible from Munnar", "A rugged jeep trail leads to the world's highest tea plantation, where a 1930s-era tea factory still operates and sunrise above the clouds is the signature experience.", "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Kashmir": {
      intro: "Beyond Srinagar, Gulmarg and Pahalgam are alpine meadows, quiet valleys and landscapes that still feel wonderfully remote.",
      hero: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Bangus Valley", "Kupwara • 95 km from Srinagar", "A vast alpine meadow ringed by high peaks, with wildflowers in summer and a level of silence far removed from Gulmarg. The guide notes permit and self-sufficient camping requirements.", "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=88"],
        ["Yusmarg", "47 km from Srinagar", "A pine-forested meadow at 2,400m with the Doodhganga stream and the glacial Nilnag lake beyond. A peaceful alternative for wildflowers and crowd-free mountain views.", "https://images.unsplash.com/photo-1566837497312-7be4a2b0d67b?auto=format&fit=crop&w=1000&q=88"],
        ["Aru Valley", "12 km from Pahalgam", "A broad meadow surrounded by pine forests and a traditional village, serving as a base for the Kolahoi Glacier and Tarsar-Marsar lake treks.", "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?auto=format&fit=crop&w=1000&q=88"],
        ["Lolab Valley", "30 km from Kupwara", "A quiet valley of deodar, pine and fir, old walnut and apple orchards and the intriguing Kalaroos Caves — preserved in part by its anonymity.", "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Bali": {
      intro: "Step away from Bali's busiest strips into rice country, local villages, water temples and beaches where the pace changes completely.",
      hero: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Sidemen Valley", "At the foot of Mount Agung", "Emerald rice terraces, quiet villages and traditional weaving communities create a slower, more local alternative to Ubud's main tourist strip.", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=88"],
        ["Tibumana Waterfall", "30 minutes from Ubud", "A slender waterfall dropping into a clear pool amid mossy cliffs and jungle vines. The guide recommends arriving around 6 AM for a quieter experience.", "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=88"],
        ["Pura Telaga Waja", "North of Ubud", "A historic water temple reached through rice fields and stone steps, with ritual pools and water spouts still used for Balinese purification ceremonies.", "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=88"],
        ["Nyang Nyang Beach", "South of Uluwatu", "A long white-sand beach reached after a steep descent, framed by limestone cliffs and the Indian Ocean with none of the usual beach-club scene.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Dubai": {
      intro: "Beyond the skyline are raw beaches, creative warehouses, archaeological stories and mountain landscapes within easy reach of the city.",
      hero: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Al Sufouh Secret Beach", "Between Burj Al Arab & Palm Jumeirah", "A raw stretch of sand with views of both the Burj Al Arab and Palm Jumeirah — a striking contrast to Dubai's polished resort beaches.", "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=88"],
        ["Alserkal Avenue & The Courtyard", "Al Quoz", "Converted warehouse spaces filled with galleries, indie cafés and design studios. Textured courtyards and creative spaces offer a different side of Dubai.", "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1000&q=88"],
        ["Saruq Al Hadid Archaeology Museum", "Al Shindagha", "An archaeological window into an Iron Age metallurgical centre, with thousands of objects including copper, gold and bronze discoveries.", "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=88"],
        ["Hatta Mountains & Dam", "About 90 minutes from Dubai", "Turquoise water, rugged Hajar Mountains, kayaking, paddleboarding, hiking and mountain biking create a completely different Dubai day.", "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Sikkim": {
      intro: "Leave the familiar Gangtok–Tsomgo–Pelling circuit behind for tribal valleys, glacial lakes, old monasteries and natural hot springs.",
      hero: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Dzongu Valley", "North Sikkim", "A protected Lepcha reserve with forested valleys, homestays, orchids, mountain streams and a way of life shaped by local traditions rather than resort tourism.", "https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1000&q=88"],
        ["Menmecho Lake", "20 km beyond Tsomgo Lake", "A high glacial lake surrounded by pine and rhododendron forests, rarely included in mainstream itineraries and best visited in its accessible seasons.", "https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1000&q=88"],
        ["Rinchenpong", "45 km from Pelling", "A hilltop village with an old monastery, the historic Tikjuk Pokhari and a different perspective on Kanchenjunga's southern face.", "https://images.unsplash.com/photo-1581791538302-03537b9c97bf?auto=format&fit=crop&w=1000&q=88"],
        ["Borong Hot Springs", "25 km from Ravangla", "Natural sulphur hot springs beside the river, paired with the nearby sacred Tendong Hill and a slower village setting.", "https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Rajasthan": {
      intro: "Beyond Jaipur, Jodhpur and Udaipur lies a Rajasthan of stepwells, leopard country, old fort walls and quieter heritage towns.",
      hero: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Bundi", "Hadoti region", "Blue-painted houses, narrow lanes and historic stepwells give Bundi a distinctly intimate character, with Taragarh Fort rising above the old town.", "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=88"],
        ["Toorji Ka Jhalra", "Old Jodhpur", "An ornate 18th-century stepwell hidden among Jodhpur's narrow lanes, close to the Clock Tower and surrounded by atmospheric blue streets.", "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=88"],
        ["Jawai Bandh", "Pali district", "Rocky hills, caves and villages form an unusual landscape where leopards and local communities have coexisted for generations.", "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1000&q=88"],
        ["Kumbhalgarh Fort", "Near Udaipur", "A monumental hill fort with a 36 km wall and hundreds of temples, often skipped by travellers focused only on Udaipur's lakes and palaces.", "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Andaman & Nicobar": {
      intro: "Trade the headline beaches for quieter stretches of sand, hidden lagoons and guided intertidal experiences around Havelock and Neil.",
      hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Kalapathar Beach", "Eastern Havelock", "A quiet white-sand beach backed by forest and dramatic dark rocks, best suited to slow walks and sunrise rather than water-sport crowds.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=88"],
        ["Neil's Cove", "Near Radhanagar Beach", "A sheltered lagoon with clear blue-green water, fallen trees and dense greenery — a small detour that feels much more secluded than the main beach.", "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=88"],
        ["Neil Bridge Marine Trail", "Neil Island", "A guided low-tide intertidal walk revealing mangroves, seagrass, coral and small marine life, with special night experiences described in the guide.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=88"],
        ["Govind Nagar Beach", "Near Havelock Jetty", "A calm, non-commercial public beach with shallow water and coconut palms — an easy local-feeling stop for families and sunrise lovers.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Uttarakhand": {
      intro: "Beyond Nainital, Mussoorie and Rishikesh are forested cantonments, remote Himalayan valleys, quiet lanes and secret river trails.",
      hero: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Chakrata", "88 km from Dehradun", "A quiet cantonment town with Tiger Falls, limestone caves, high viewpoints and old deodar forests — a calmer mountain alternative to crowded hill stations.", "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=88"],
        ["Munsiyari", "Far eastern Uttarakhand", "A Himalayan base surrounded by the Panchachuli range, with family-run homestays and access to glacier treks.", "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1000&q=88"],
        ["Landour", "Above Mussoorie", "Quiet winding lanes, colonial architecture, small bakeries and mountain walks create a very different atmosphere from Mussoorie's busy Mall Road.", "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=88"],
        ["Rishikesh's Secret Spots", "Beyond the Lakshman Jhula crowds", "The guide highlights quieter mountain paths, forest waterfalls and a hidden riverside stretch known as Pink Sand Beach.", "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Singapore": {
      intro: "Look beyond Marina Bay and Sentosa for an island frozen in time, unusual cultural spaces, Singapore's last kampong and a quieter beach escape.",
      hero: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Pulau Ubin", "Bumboat from Changi Point", "Cycle gravel paths, explore Chek Jawa wetlands and see kampong houses and a slower island rhythm that feels decades away from downtown.", "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1000&q=88"],
        ["Haw Par Villa", "Singapore", "A free-entry cultural oddity filled with vivid Chinese mythology sculptures and a famous Ten Courts of Hell diorama.", "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=88"],
        ["Kampong Lorong Buangkok", "Hougang", "Singapore's last surviving kampong, where wooden homes, gardens and everyday village life sit unexpectedly inside the modern city.", "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=88"],
        ["Lazarus Island", "Short boat ride from Marina South Pier", "Clear water and a quieter beach setting away from Sentosa's bustle — ideal for a simple picnic-and-swim island afternoon.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Maldives": {
      intro: "Beyond the classic overwater villa is a more local Maldives: long sandbanks, marine encounters, reef islands and wilder diving landscapes.",
      hero: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Dhigurah Island", "South Ari Atoll", "A local island with a long sandbank and year-round whale-shark and manta-ray encounters, offering a more community-based alternative to resort-only travel.", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=88"],
        ["Guraidhoo Island", "South Malé Atoll", "A local island known for fishing and boat-building traditions, reef diving and low-tide sandbanks surrounded by turquoise water.", "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=88"],
        ["Hanifaru Bay", "Baa Atoll", "A marine spectacle where manta rays can gather in large numbers during the season, with access through the nearby island of Dharavandhoo.", "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=88"],
        ["Fuvahmulah", "Equatorial Maldives", "A distinctive single-island atoll with freshwater lakes, unusual geography and famous tiger-shark diving — a wilder side of the Maldives.", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Mauritius": {
      intro: "Beyond resort beaches are basalt waterfalls, wild coastal blowholes, crater lakes and forested viewpoints across the island's interior.",
      hero: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Rochester Falls", "Near Souillac", "Water cascades over distinctive basalt formations into a clear pool, reached through sugarcane country away from the usual resort route.", "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=88"],
        ["Le Souffleur", "Near L'Escalier", "A rugged coastal blowhole where waves surge through a sea cave and erupt like a natural geyser along the island's wilder southern coast.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=88"],
        ["Bassin Blanc", "Chamouny highlands", "A volcanic crater lake surrounded by dense forest, with a raw, quiet setting that can be paired with nearby Grand Bassin.", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=88"],
        ["Malenga View Point", "Moka district", "A forested climb leads to dramatic views over Pieter Both mountain and the interior around Creve Coeur — simple, quiet and highly scenic.", "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=88"]
      ]
    },
    "Malaysia": {
      intro: "Beyond Kuala Lumpur and Langkawi's headline attractions are quiet beaches, family-run food stories and rainforest waterfalls close to the city.",
      hero: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1800&q=90",
      gems: [
        ["Pantai Teluk Yu / Shark Bay Beach", "Northern Langkawi", "A secluded northern beach with calm water, lush surroundings and almost none of the commercial bustle of Pantai Cenang.", "https://images.unsplash.com/photo-1508062878650-88b52897f298?auto=format&fit=crop&w=1000&q=88"],
        ["Langkawi Sushi — Aunty Jepun's Home Kitchen", "Kampung Pasir Hitam", "A tiny home kitchen with a deeply personal story, where handmade sushi is served in a family setting and the food is made from scratch.", "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=88"],
        ["Sungai Sendat Waterfall", "Near Ulu Yam", "A multi-tiered waterfall with natural pools and a local-weekend feel, reached as the road from Kuala Lumpur turns into winding green countryside.", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=88"],
        ["Durian Perangin Waterfall", "Northern Langkawi", "A rainforest cascade with multiple tiers, shallow pools and a gentle forest walk — an easy antidote to a busy beach day.", "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=88"]
      ]
    }
  };

const hiddenGemDetails = {"Kerala":{"Kanthalloor":"A misty highland village about 50 km from Munnar, Kanthalloor sits around 5,000 feet and is known for apples, plums and peaches. The guide highlights its living barter tradition, sandalwood forests and the ancient Muniyara Dolmens, making it a striking mix of rural life, highland agriculture and deep history.","Thanneermukkom Backwaters":"Away from Alleppey's busiest canals, Thanneermukkom offers a quieter backwater experience where local fishermen work Chinese nets, duck farmers tend their flocks and coir makers continue traditional craft. Between August and October, flooded paddy fields can fill with pink water lilies, while country boats move through the narrow channels.","Munroe Island":"Munroe Island is a quieter backwater world where small canoes replace large houseboats. Narrow village canals pass beneath coconut palms and mangroves, with schoolchildren waving from the banks and a Dutch-era church beside Ashtamudi Lake. The defining experience is the silence and intimacy of village life on the water.","Kolukkumalai Tea Estate":"Accessible by a rugged jeep trail from the Munnar region, Kolukkumalai is presented in the guide as the world's highest tea plantation. A 1930s British-era tea factory still operates with traditional methods, while the high-altitude setting makes sunrise above the clouds the signature experience."},"Kashmir":{"Bangus Valley":"Bangus is a vast alpine meadow in Kupwara, described in the guide as a glimpse of what Kashmir's mountain tourism felt like before the crowds. The valley is surrounded by high peaks and wildflowers, while Gujjar and Bakerwal herders continue seasonal grazing. There are no hotels or shops in the valley, so this is an expedition-style experience rather than a conventional sightseeing stop.","Yusmarg":"Yusmarg is a pine-forested meadow at around 2,400 metres, far quieter than Kashmir's headline destinations. The guide points to nearby Nilnag, a clear glacial lake reached on foot or by pony, and the Doodhganga stream running through the meadow. May-June brings wildflowers; September offers crisp, crowd-free views.","Aru Valley":"Beyond the better-known Betaab Valley, Aru opens into a wide meadow at about 2,414 metres, enclosed by pine forests. The village remains connected to Gujjar and Bakerwal pastoral life and serves as a base for the Kolahoi Glacier and Tarsar-Marsar treks. Trout fishing is also possible with a permit.","Lolab Valley":"Lolab is presented as one of Kashmir's quieter valleys, stretching for about 25 km between deodar, pine and fir-covered mountains. Centuries-old walnut and apple orchards shape the landscape, while the Satbaran forest and Kalaroos Caves add a deeper layer of nature and history. Its relative anonymity is part of what preserves its character."},"Bali":{"Sidemen Valley":"Sidemen offers a slower alternative to Ubud's busy centre. Emerald rice terraces, quiet villages and traditional weaving communities remain closely tied to farming and Balinese traditions, with Mount Agung rising above the valley. The attraction is not a single monument but the chance to experience a more rural rhythm of Bali.","Tibumana Waterfall":"Tibumana is a slender waterfall hidden among jungle vegetation, dropping into a clear, shallow pool surrounded by mossy rock faces and vines. The guide connects the place with local legend and recommends an early-morning visit, when the forest setting is at its quietest.","Pura Telaga Waja":"Hidden in a ravine north of Ubud, Pura Telaga Waja is reached by a footpath through rice fields and a descent of stone steps. The guide describes two pools associated with Shiva and Buddha and 11 water spouts used for melukat, a Balinese purification ritual. The temple remains an active place of local religious practice.","Nyang Nyang Beach":"After a descent of more than 600 steps, Nyang Nyang opens onto a long stretch of white sand beneath dramatic limestone cliffs. Unlike the busy beach-club areas of southern Bali, the guide describes it as a place without sunbeds, music or commercial bustle — simply sand, cliffs and the Indian Ocean."},"Dubai":{"Al Sufouh Secret Beach":"Known locally as Secret Beach or Black Palace Beach, this quiet stretch sits between the Burj Al Arab and Palm Jumeirah. There are no cafés, music or typical beach facilities; instead, a sandy path leads to open views of Dubai's landmarks from a much more natural setting. The guide recommends sunrise or sunset between November and April.","Alserkal Avenue & The Courtyard":"Alserkal Avenue is Dubai's creative side, where galleries, independent cafés and design studios occupy converted warehouse spaces. The Courtyard adds Mediterranean, rustic and bohemian details — vine-covered walls, textured archways and colourful doors that contrast sharply with the city's glass towers.","Saruq Al Hadid Archaeology Museum":"Saruq Al Hadid opens a window into the UAE's ancient past. The guide describes an Iron Age metallurgical centre discovered after unusual desert dunes drew attention, with thousands of objects including copper, gold and bronze artefacts. The museum provides a very different Dubai experience from skyscrapers and shopping malls.","Hatta Mountains & Dam":"About 90 minutes from central Dubai, Hatta brings rugged Hajar Mountain scenery and turquoise water into the itinerary. Visitors can kayak or paddleboard on Hatta Dam, explore mountain-bike and hiking routes, and see traditional village landscapes. The nearby Al Marmoom Camel Racetrack adds a glimpse of Emirati heritage."},"Sikkim":{"Dzongu Valley":"Dzongu is a protected Lepcha tribal reserve within the Khangchendzonga Biosphere Reserve. The guide describes orchid-rich forests, possible red panda sightings, homestays in wooden homes and local traditions shaped by a deep relationship with rivers and mountains. Lingdem's hot springs add a quiet natural experience, while permits are required.","Menmecho Lake":"Beyond the better-known Tsomgo Lake, Menmecho sits at around 12,500 feet, fed by streams from Jelep La Pass and surrounded by pine and rhododendron forests. It is a glacial lake and trout habitat, and the guide notes that winter access is restricted when the lake and route freeze.","Rinchenpong":"Rinchenpong is a hilltop village near Pelling with a long monastic and colonial-era history. The guide highlights its old monastery, the historical Poison Lake and a different perspective of Kanchenjunga's south face. Small homestays make it feel more intimate than a conventional resort stop.","Borong Hot Springs":"Near Ravangla, Borong is a high-altitude village with natural sulphur hot springs beside the river. The guide describes two communal pools and notes that locals especially enjoy them after the rice harvest. Nearby Tendong Hill is regarded as a sacred mountain in Lepcha tradition."},"Rajasthan":{"Bundi":"Bundi is known for blue-painted houses, narrow lanes and a remarkable collection of stepwells, earning it the nickname 'Chhoti Kashi'. The guide also points to Taragarh Fort, its tunnel system and nearby rock-art sites, creating a destination where architecture, folklore and deep history sit side by side.","Toorji Ka Jhalra Stepwell":"Hidden in the old lanes of Jodhpur, this 18th-century stepwell descends through multiple levels decorated with Marwar-style carvings. The guide places it close to the Clock Tower and connects the surrounding blue streets with Pachetia Hills, offering a quieter way to view Mehrangarh beyond the usual tourist circuit.","Jawai Bandh":"Jawai is a landscape where granite hills, caves and villages are shared by people and a thriving leopard population. Instead of the queues and fixed safari routes associated with major national parks, the guide presents Jawai as an open landscape experience, with luxury tented camps and strong opportunities for wildlife photography.","Kumbhalgarh Fort":"Kumbhalgarh is the 'Great Wall of India', with a massive fortification stretching across the Aravalli hills. The guide highlights its 15th-century heritage, long defensive wall and the hundreds of temples within the complex. Because many visitors to Udaipur skip it, it can feel like a more immersive heritage excursion."},"Andaman & Nicobar":{"Kalapathar Beach":"Kalapathar offers the quieter side of Havelock. There are no water-sports counters, beach chairs or music — just white sand, dark rocks and forest. The guide recommends sunrise because the beach faces east, and the route passes paddy fields and village homes that reveal an Andaman beyond the resort strip.","Neil's Cove":"A short shoreline walk from Radhanagar leads to Neil's Cove, a sheltered lagoon where clear water, fallen trees and dense greenery create an almost untouched feel. At low tide, rocky seabed and small tidal pools become visible. The guide notes that there are no facilities here, so it remains a simple, nature-first stop.","Neil Bridge Marine Trail":"This guided intertidal walk is timed to low tide, when mangroves, seagrass beds and coral habitats become accessible. Naturalists lead small groups through shallow water to look for marine life, while special full- and new-moon outings can add a bioluminescent dimension to the experience.","Govind Nagar Beach":"Govind Nagar is one of the first beaches visitors encounter on Havelock, yet many continue straight past it. The guide describes it as a non-commercial public beach with shallow, gentle water, coconut palms and sunrise views. Its lack of shacks and watersports counters is exactly what gives it a peaceful character."},"Uttarakhand":{"Chakrata":"Chakrata is a high-altitude cantonment town with a more regulated, untamed atmosphere than mainstream hill stations. The guide highlights Tiger Falls, the Budher limestone caves, Deoban's panoramic Himalayan views and Kanasar's enormous deodar trees. It works especially well for travellers looking for forest, viewpoints and adventure away from crowded Mall Roads.","Munsiyari":"Often called 'Mini Kashmir', Munsiyari sits beneath the Panchachuli range, whose five peaks dominate the skyline. The guide recommends sunrise for the golden light on the snow, along with family-run homestays and the region's role as a base for Milam Glacier and Namik Glacier treks.","Landour":"Above Mussoorie, Landour feels like a quieter mountain world of winding lanes, colonial architecture, small bakeries and forest views. The guide mentions its literary connections, the Shedup Choepelling Temple, nearby Sainji's Corn Village and the Nag Tibba trek — a strong combination of slow travel and accessible adventure.","Rishikesh's Secret Spots":"Beyond Lakshman Jhula's crowds, the guide points to quieter Rishikesh experiences including Cloud Point, forested Kotli Bhel, the three-cascade Neer Gaddu waterfall and Pink Sand Beach. Together they show a softer side of the region where mountain paths, waterfalls and riverside landscapes replace the busiest city viewpoints."},"Singapore":{"Pulau Ubin":"Pulau Ubin feels like a Singapore from another era. The guide describes gravel cycling paths, Chek Jawa wetlands, wooden stalls, kampong-style homes and a slower island rhythm without the malls and dense urban atmosphere of the mainland. It is a strong nature-and-culture contrast to central Singapore.","Haw Par Villa":"Built in the 1930s, Haw Par Villa is a surreal cultural attraction filled with Chinese mythology, vivid statues and the famous Ten Courts of Hell diorama. The guide's appeal is precisely that it feels strange, theatrical and unlike Singapore's polished modern landmarks — a deliberately unconventional stop.","Kampong Lorong Buangkok":"Singapore's last surviving kampong offers a glimpse of village life within a modern city. The guide describes wooden homes, open yards and a small community that feels worlds away from skyscrapers. Visitors are encouraged to arrive gently, respect residents and ask before taking photographs.","Lazarus Island":"Lazarus Island is presented as the quieter beach alternative to Sentosa. A short boat ride from Marina South Pier leads to clear water and a low-key beach with little commercial infrastructure. The guide recommends bringing your own snacks and swimwear and simply enjoying the open space."},"Maldives":{"Dhigurah Island":"Dhigurah is a local island in South Ari Atoll known for a long sandbank and access to year-round whale shark and manta ray encounters. The guide contrasts it with resort-only Maldives by highlighting guesthouses and the nearby marine protected area, creating a more local and marine-focused island experience.","Guraidhoo Island":"Guraidhoo combines traditional island life with strong diving and sandbank experiences. The guide describes a community shaped by fishing and boat building, along with encounters with nurse sharks, manta rays, sea turtles and reef fish. Low-tide sandbanks create a particularly secluded turquoise-water experience.","Hanifaru Bay":"Hanifaru Bay is famous for seasonal gatherings of manta rays, especially between May and November. The guide highlights snorkelling experiences around the marine-rich bay and nearby Dharavandhoo, while Kendhoo adds a cultural dimension with its historic coral-stone mosque.","Fuvahmulah":"Fuvahmulah stands apart from the classic postcard Maldives. It is a single-island atoll with freshwater lakes, unusual geography and a reputation for tiger-shark diving. The guide presents it as the adventurous, wild side of the country rather than a conventional resort escape."},"Mauritius":{"Rochester Falls":"Near Souillac, Rochester Falls drops over distinctive rectangular basalt columns formed by volcanic geology. The guide describes a rugged route through sugarcane fields leading to a clear pool and notes the adventurous local cliff-jumping culture around the falls.","Le Souffleur":"Le Souffleur is a raw southern-coast blowhole where waves force water through a sea cave and create a geyser-like burst. There are no polished tourist facilities or railings, and the surrounding cliffs and coastline preserve a more untamed side of Mauritius.","Bassin Blanc":"Bassin Blanc is a volcanic crater lake surrounded by dense forest in the Chamouny highlands. The guide describes it as one of Mauritius's least visited crater lakes, with no ticket office or major facilities — simply a quiet viewpoint experience that can be paired with nearby Grand Bassin.","Malenga View Point":"A climb of roughly 375 steps through a forested hillside leads to Malenga View Point in the Moka district. From the top, the guide highlights Pieter Both mountain and the village of Creve Coeur, with wild guavas along the route in season."},"Malaysia":{"Pantai Teluk Yu / Shark Bay Beach":"On northern Langkawi, Pantai Teluk Yu is a secluded beach with calm water, greenery and very little commercial activity. The guide recommends it for sunrise photography, meditation and quiet time, with visitors advised to carry their own food because there are no beach outlets.","Langkawi Sushi — Aunty Jepun's Home Kitchen":"This intimate food story centres on a 78-year-old Japanese-Malaysian woman who prepares handmade sushi in her home kitchen in Kampung Pasir Hitam. The guide describes a family dining setting and a small menu rooted in a personal journey from sharing food with neighbours to running a tiny eatery.","Sungai Sendat Waterfall":"About 45 minutes from Kuala Lumpur, Sungai Sendat transitions quickly from city roads to winding countryside and dense greenery. The guide describes multiple cascades and natural pools, with weekends attracting locals — making an early visit the best way to experience its quieter side.","Durian Perangin Waterfall":"On Langkawi's northern slopes, Durian Perangin is a multi-tiered rainforest cascade with clear shallow pools and a short, accessible walk. Paved steps, gazebos and a suspension bridge make the lower levels easy to reach, while higher tiers offer a little more adventure."}};
  function openDestinationExplorer(name) {
    const destination = destinationDetails[name];
    if (!destination || !destinationModal) return;
    selectedDestination = name;
    document.getElementById("destinationModalTitle").textContent = name;
    document.getElementById("destinationModalTag").textContent = destination.tag;
    document.getElementById("destinationModalDescription").textContent = destination.desc;
    document.getElementById("destinationModalBest").textContent = destination.best;
    ["destinationMainImage", "destinationImageTwo", "destinationImageThree"].forEach((id, i) => {
      const image = document.getElementById(id);
      if (!image) return;
      image.src = destination.images[i];
      image.alt = `${name} travel view ${i + 1}`;
      image.loading = i === 0 ? "eager" : "lazy";
    });
    const gemData = hiddenGems[name];
    const gemHero = document.getElementById("hiddenGemsHero");
    const gemGrid = document.getElementById("hiddenGemsGrid");
    const gemIntro = document.getElementById("hiddenGemsIntro");
    if (gemData && gemHero && gemGrid) {
      gemHero.style.backgroundImage = `url("${gemData.hero}")`;
      if (gemIntro) gemIntro.textContent = gemData.intro;
      gemGrid.innerHTML = gemData.gems.map((gem, i) => `
        <article class="hidden-gem-card" tabindex="0" role="button" data-gem-index="${i}">
          <div class="hidden-gem-image"><img src="${gem[3]}" alt="${gem[0]}" loading="lazy"><span>${String(i + 1).padStart(2,"0")}</span></div>
          <div class="hidden-gem-body"><small>${gem[1]}</small><h4>${gem[0]}</h4><p>${gem[2]}</p><div class="hidden-gem-cta">Explore this place <span>→</span></div></div>
        </article>`).join("");
      gemGrid.querySelectorAll(".hidden-gem-card").forEach(card => {
        const activate = () => openHiddenGemDetail(name, Number(card.dataset.gemIndex));
        card.addEventListener("click", activate);
        card.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(); }
        });
      });
    }
    openModal(destinationModal, "#destinationModalClose");
  }

  const hiddenGemDetailModal = document.getElementById("hiddenGemDetailModal");
  const hiddenGemDetailClose = document.getElementById("hiddenGemDetailClose");
  const hiddenGemDetailPlanBtn = document.getElementById("hiddenGemDetailPlanBtn");
  const hiddenGemPrev = document.getElementById("hiddenGemPrev");
  const hiddenGemNext = document.getElementById("hiddenGemNext");
  let selectedHiddenGem = "";
  let selectedHiddenGemDestination = "";
  let selectedHiddenGemIndex = 0;

  function renderHiddenGemDetail(destinationName, index, shouldOpen = false) {
    const data = hiddenGems[destinationName];
    const gems = data?.gems || [];
    if (!data || !gems.length || !hiddenGemDetailModal) return;
    const safeIndex = (index + gems.length) % gems.length;
    const gem = gems[safeIndex];
    const title = gem[0];
    const longDescription = hiddenGemDetails[destinationName]?.[title] || gem[2];
    selectedHiddenGemDestination = destinationName;
    selectedHiddenGemIndex = safeIndex;
    selectedHiddenGem = title;

    const hero = document.getElementById("hiddenGemDetailHeroImage");
    const titleEl = document.getElementById("hiddenGemDetailTitle");
    const locationEl = document.getElementById("hiddenGemDetailLocation");
    const descEl = document.getElementById("hiddenGemDetailDescription");
    const currentEl = document.getElementById("hiddenGemDetailCurrent");
    const totalEl = document.getElementById("hiddenGemDetailTotal");
    if (hero) { hero.src = gem[3]; hero.alt = title; }
    if (titleEl) titleEl.textContent = title;
    if (locationEl) locationEl.textContent = `${gem[1]}  •  ${destinationName}`;
    if (descEl) descEl.textContent = longDescription;
    if (currentEl) currentEl.textContent = String(safeIndex + 1).padStart(2, "0");
    if (totalEl) totalEl.textContent = String(gems.length).padStart(2, "0");

    const destinationImages = destinationDetails[destinationName]?.images || [];
    const gallery = [gem[3], destinationImages[1] || gem[3], destinationImages[2] || gem[3]];
    const captions = ["The hidden place", `More of ${destinationName}`, "The surrounding landscape"];
    const galleryEl = document.getElementById("hiddenGemDetailGallery");
    if (galleryEl) {
      galleryEl.innerHTML = gallery.map((src,i) => `<figure><img src="${src}" alt="${title} — view ${i+1}" loading="${i===0?'eager':'lazy'}"><figcaption>${captions[i]}</figcaption></figure>`).join("");
    }
    if (shouldOpen) openModal(hiddenGemDetailModal, "#hiddenGemDetailClose");
  }

  function openHiddenGemDetail(destinationName, index) {
    renderHiddenGemDetail(destinationName, index, true);
  }
  function moveHiddenGemDetail(direction) {
    if (!selectedHiddenGemDestination) return;
    renderHiddenGemDetail(selectedHiddenGemDestination, selectedHiddenGemIndex + direction, false);
  }

  function closeHiddenGemDetail() { closeModal(hiddenGemDetailModal); }
  hiddenGemDetailClose?.addEventListener("click", closeHiddenGemDetail);
  hiddenGemPrev?.addEventListener("click", () => moveHiddenGemDetail(-1));
  hiddenGemNext?.addEventListener("click", () => moveHiddenGemDetail(1));
  hiddenGemDetailModal?.addEventListener("click", event => { if (event.target === hiddenGemDetailModal) closeHiddenGemDetail(); });
  hiddenGemDetailPlanBtn?.addEventListener("click", () => {
    const destination = selectedDestination || selectedHiddenGemDestination;
    const experience = selectedHiddenGem;
    closeHiddenGemDetail();
    window.setTimeout(() => openTravelContact({ destination: `${destination} — ${experience}` }), 160);
  });

  function closeDestinationExplorer() { closeModal(destinationModal); }
  destinationModalClose?.addEventListener("click", closeDestinationExplorer);
  destinationModal?.addEventListener("click", event => {
    if (event.target === destinationModal) closeDestinationExplorer();
  });
  destinationPlanBtn?.addEventListener("click", () => {
    const destination = selectedDestination;
    closeDestinationExplorer();
    if (destinationInput) destinationInput.value = destination;
    window.setTimeout(() => openTravelContact({ destination }), 160);
  });

  document.getElementById("storyPlanBtn")?.addEventListener("click", () => openTravelContact({ destination: "Custom holiday" }));

  document.addEventListener("keydown", event => {
    if (activeModal === hiddenGemDetailModal) {
      if (event.key === "ArrowLeft") { event.preventDefault(); moveHiddenGemDetail(-1); return; }
      if (event.key === "ArrowRight") { event.preventDefault(); moveHiddenGemDetail(1); return; }
    }
    if (!activeModal) return;
    if (event.key === "Escape") {
      closeModal(activeModal);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = getFocusable(activeModal);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });



  // V44 destination + package filters: lightweight client-side filtering, no backend required.
  const destinationFilterButtons = document.querySelectorAll(".explorer-filter");
  const destinationCards = document.querySelectorAll(".destination[data-place]");
  destinationFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      destinationFilterButtons.forEach(b => {
        const active = b === button;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      destinationCards.forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-filter-hidden", !show);
      });
    });
  });

  const packageFilterButtons = document.querySelectorAll(".package-filter");
  const packageCards = document.querySelectorAll(".package-card[data-package-category]");
  const packageCount = document.getElementById("packageCount");
  packageFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.packageFilter || "all";
      let visible = 0;
      packageFilterButtons.forEach(b => b.classList.toggle("is-active", b === button));
      packageCards.forEach(card => {
        const show = filter === "all" || card.dataset.packageCategory === filter;
        card.classList.toggle("is-filter-hidden", !show);
        if (show) visible++;
      });
      if (packageCount) packageCount.textContent = `${visible} curated ${visible === 1 ? "journey" : "journeys"}`;
    });
  });

  document.getElementById("mobilePlanBtn")?.addEventListener("click", () => {
    planner();
  });

  // V25 cinematic foreground poster carousel: random order + random motion.
  const posterCarousel = document.getElementById("posterCarousel");
  const posterCards = posterCarousel ? Array.from(posterCarousel.querySelectorAll(".poster-card")) : [];
  const posterDots = document.getElementById("posterDots");
  const posterPrev = document.getElementById("posterPrev");
  const posterNext = document.getElementById("posterNext");
  const posterPause = document.getElementById("posterPause");
  let posterIndex = 0;
  let posterTimer = null;
  let posterPaused = false;
  let posterLastIndex = -1;
  const posterReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const posterMotionClasses = ["motion-zoom", "motion-pan-left", "motion-pan-right", "motion-lift", "motion-breathe"];
  const posterEasings = ["cubic-bezier(.18,.78,.18,1)", "cubic-bezier(.2,.62,.25,1)", "cubic-bezier(.35,.05,.15,1)", "cubic-bezier(.12,.9,.2,1)"];

  // Shuffle once on every page load so the hero never feels repetitive.
  for (let i = posterCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [posterCards[i], posterCards[j]] = [posterCards[j], posterCards[i]];
  }
  posterCards.forEach(card => posterCarousel?.appendChild(card));
  if (posterCards.length) posterIndex = Math.floor(Math.random() * posterCards.length);

  function posterPosition(offset) {
    const n = posterCards.length;
    if (!n) return "is-hidden";
    const normalized = ((offset % n) + n) % n;
    if (normalized === 0) return "is-active";
    if (normalized === 1) return "is-right";
    if (normalized === n - 1) return "is-left";
    if (normalized === 2) return "is-far-right";
    if (normalized === n - 2) return "is-far-left";
    return "is-hidden";
  }

  function pickMotion() {
    if (posterReducedMotion) return "";
    let motion = posterMotionClasses[Math.floor(Math.random() * posterMotionClasses.length)];
    if (motion === posterLastIndex) motion = posterMotionClasses[(posterMotionClasses.indexOf(motion) + 1) % posterMotionClasses.length];
    posterLastIndex = motion;
    return motion;
  }

  function syncPosterVideos() {
    posterCards.forEach((card, i) => {
      const video = card.querySelector(".poster-media");
      if (!video) return;
      if (i === posterIndex && !posterPaused) {
        // Muted + playsinline + autoplay allows browsers to start the cinematic layer
        // without requiring a user gesture. Restart from the beginning on every shuffle.
        try { video.currentTime = 0; } catch (_) {}
        video.muted = true;
        video.playsInline = true;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
      } else {
        video.pause();
        try { video.currentTime = 0; } catch (_) {}
      }
    });
  }

  function bindPosterVideoEvents() {
    posterCards.forEach(card => {
      const video = card.querySelector(".poster-media");
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      // When the active video finishes, immediately pick another destination.
      // This makes the carousel truly video-driven instead of waiting on a fixed timer.
      video.addEventListener("ended", () => {
        const index = posterCards.indexOf(card);
        if (index !== posterIndex || posterPaused) return;
        movePoster(1);
        restartPosterTimer();
      });
      // Some browsers can interrupt autoplay after a tab visibility/network change.
      video.addEventListener("pause", () => {
        if (posterCards.indexOf(card) === posterIndex && !posterPaused && !document.hidden) {
          const retry = video.play();
          if (retry && typeof retry.catch === "function") retry.catch(() => {});
        }
      });
    });
  }

  function renderPosterCarousel(announce = false) {
    if (!posterCards.length) return;
    const motion = pickMotion();
    const duration = `${(0.72 + Math.random() * 0.55).toFixed(2)}s`;
    const easing = posterEasings[Math.floor(Math.random() * posterEasings.length)];
    posterCards.forEach((card, i) => {
      card.classList.remove("is-active", "is-left", "is-right", "is-far-left", "is-far-right", "is-hidden", ...posterMotionClasses);
      card.style.setProperty("--poster-duration", duration);
      card.style.setProperty("--poster-ease", easing);
      card.classList.add(posterPosition(i - posterIndex));
      if (i === posterIndex && motion) {
        card.classList.add(motion);
        card.style.animationDuration = `${(4.4 + Math.random() * 1.8).toFixed(2)}s`;
      }
      card.setAttribute("aria-hidden", i === posterIndex ? "false" : "true");
    });
    if (posterDots) {
      posterDots.innerHTML = posterCards.map((card, i) => `<button type="button" class="poster-dot${i === posterIndex ? " is-active" : ""}" data-poster-index="${i}" aria-label="Show ${card.querySelector("strong")?.textContent || "destination"}" aria-current="${i === posterIndex ? "true" : "false"}"></button>`).join("");
      posterDots.querySelectorAll(".poster-dot").forEach(dot => dot.addEventListener("click", () => {
        posterIndex = Number(dot.dataset.posterIndex) || 0;
        renderPosterCarousel(true);
        restartPosterTimer();
      }));
    }
    if (announce && posterCarousel) {
      const activeName = posterCards[posterIndex]?.querySelector("strong")?.textContent || "destination";
      posterCarousel.setAttribute("aria-label", `Featured destination: ${activeName}`);
    }
    syncPosterVideos();
  }

  function movePoster(step = 1) {
    if (!posterCards.length) return;
    if (step < 0) {
      posterIndex = (posterIndex - 1 + posterCards.length) % posterCards.length;
    } else {
      // Random next destination; never immediately repeat the current one.
      const choices = posterCards.map((_, i) => i).filter(i => i !== posterIndex);
      posterIndex = choices[Math.floor(Math.random() * choices.length)];
    }
    renderPosterCarousel(true);
  }
  function stopPosterTimer() { if (posterTimer) { clearTimeout(posterTimer); posterTimer = null; } }
  function restartPosterTimer() {
    stopPosterTimer();
    if (posterPaused || posterCards.length < 2) return;
    // Fallback shuffle in case a video has no usable duration or is blocked by the browser.
    // Normally the `ended` event advances the carousel as soon as the active clip finishes.
    posterTimer = setTimeout(() => {
      movePoster(1);
      restartPosterTimer();
    }, 6500 + Math.floor(Math.random() * 2500));
  }
  posterPrev?.addEventListener("click", () => { movePoster(-1); restartPosterTimer(); });
  posterNext?.addEventListener("click", () => { movePoster(1); restartPosterTimer(); });
  posterPause?.addEventListener("click", () => {
    posterPaused = !posterPaused;
    posterPause.setAttribute("aria-pressed", String(posterPaused));
    posterPause.setAttribute("aria-label", posterPaused ? "Play destination animation" : "Pause destination animation");
    posterPause.textContent = posterPaused ? "▶" : "Ⅱ";
    syncPosterVideos();
    restartPosterTimer();
  });
  posterCarousel?.addEventListener("mouseenter", stopPosterTimer);
  posterCarousel?.addEventListener("mouseleave", restartPosterTimer);
  posterCarousel?.addEventListener("focusin", stopPosterTimer);
  posterCarousel?.addEventListener("focusout", event => { if (!posterCarousel.contains(event.relatedTarget)) restartPosterTimer(); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) return;
    syncPosterVideos();
    restartPosterTimer();
  });
  bindPosterVideoEvents();
  posterCarousel?.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); movePoster(-1); restartPosterTimer(); }
    if (event.key === "ArrowRight") { event.preventDefault(); movePoster(1); restartPosterTimer(); }
  });
  renderPosterCarousel();
  restartPosterTimer();

  // Improve native image loading without changing the visual design.
  document.querySelectorAll("img[loading='lazy']").forEach(img => img.decoding = "async");

  // Register the lightweight PWA shell. It intentionally caches only first-party assets;
  // remote destination photography remains network-first.
  if ("serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});
