document.addEventListener("DOMContentLoaded",()=>{
const intro=document.getElementById("brandIntro");setTimeout(()=>{intro.classList.add("done");document.body.classList.remove("locked")},3600);intro.addEventListener("transitionend",()=>{if(intro.classList.contains("done"))intro.remove()},{once:true});
const menu=document.getElementById("menuBtn"),nav=document.getElementById("navLinks");menu.addEventListener("click",()=>nav.classList.toggle("active"));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("active")));
const toast=document.getElementById("toast");function notify(m){toast.textContent=m;toast.classList.add("show");clearTimeout(window._t);window._t=setTimeout(()=>toast.classList.remove("show"),2800)}
function planner(){document.getElementById("planner").scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>document.getElementById("destination").focus(),450)}
document.getElementById("planTrip").addEventListener("click",planner);document.getElementById("customTrip").addEventListener("click",planner);
document.querySelectorAll(".destination").forEach(c=>c.addEventListener("click",()=>{document.getElementById("destination").value=c.dataset.place;notify(c.dataset.place+" selected ✨");planner()}));
document.getElementById("holidaySearch").addEventListener("submit",e=>{
    e.preventDefault();
    const p=document.getElementById("destination").value.trim();
    if(!p)return notify("Tell us where you want to go first 🌍");
    openTravelContact();
});

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

const backdrop=document.getElementById("itineraryBackdrop");
const list=document.getElementById("itineraryList");
let activePackage="";
function closeItinerary(){backdrop.classList.remove("open");backdrop.setAttribute("aria-hidden","true");document.body.style.overflow=""}
function openItinerary(name){
 const p=packageDetails[name]; if(!p)return;
 activePackage=name;
 document.getElementById("itineraryTitle").textContent=name;
 document.getElementById("itineraryDuration").textContent=p.duration;
 document.getElementById("itineraryPrice").textContent=p.price;
 document.getElementById("itineraryDescription").textContent=p.description;
 list.innerHTML=p.days.map(d=>`<div class="day-item"><div class="day-label">${d[0]}</div><div><h4>${d[1]}</h4><p>${d[2]}</p></div></div>`).join("");
 backdrop.classList.add("open");backdrop.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
document.querySelectorAll(".enquire").forEach(b=>b.addEventListener("click",()=>openItinerary(b.dataset.name)));
document.getElementById("modalClose").addEventListener("click",closeItinerary);
document.getElementById("modalCloseBottom").addEventListener("click",closeItinerary);
backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeItinerary()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeItinerary()});
document.getElementById("enquireNow").addEventListener("click",()=>{
    closeItinerary();
    setTimeout(openTravelContact,180);
});

/* Travel Expert button - independent implementation */
const travelExpertBtn = document.getElementById("travelExpertBtn");
const travelContactModal = document.getElementById("travelContactModal");
const travelContactClose = document.getElementById("travelContactClose");

function openTravelContact() {
    travelContactModal.classList.add("is-open");
    travelContactModal.setAttribute("aria-hidden", "false");
}

function closeTravelContact() {
    travelContactModal.classList.remove("is-open");
    travelContactModal.setAttribute("aria-hidden", "true");
}

if (travelExpertBtn && travelContactModal) {
    travelExpertBtn.addEventListener("click", function(event) {
        event.preventDefault();
        openTravelContact();
    });
}

if (travelContactClose && travelContactModal) {
    travelContactClose.addEventListener("click", closeTravelContact);
}

if (travelContactModal) {
    travelContactModal.addEventListener("click", function(event) {
        if (event.target === travelContactModal) {
            closeTravelContact();
        }
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && travelContactModal && travelContactModal.classList.contains("is-open")) {
        closeTravelContact();
    }
});


/* Every package Enquire Now button opens Call / WhatsApp */
document.querySelectorAll(".package-enquire-now").forEach(function(button){
    button.addEventListener("click", function(){
        activePackage = button.dataset.name || "";
        openTravelContact();
    });
});


/* Modern footer CTA uses the existing Call / WhatsApp contact popup */
const footerEnquireBtn = document.getElementById("footerEnquireBtn");
if (footerEnquireBtn) {
    footerEnquireBtn.addEventListener("click", function(event) {
        event.preventDefault();
        openTravelContact();
    });
}


/* Destination explorer */
const destinationDetails = {"Kerala":{"tag":"Backwaters • Hills • Culture","desc":"Kerala blends misty tea country, tranquil backwaters, palm-lined beaches and rich local traditions. It is ideal for couples, families and travellers looking for a slower, scenic holiday.","best":"Best for: Nature, couples, families & relaxed holidays","images":["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=85"]},"Kashmir":{"tag":"Valleys • Lakes • Snow","desc":"Kashmir is known for dramatic Himalayan landscapes, Dal Lake, flower-filled gardens and mountain escapes such as Gulmarg and Pahalgam. Every season gives the valley a different personality.","best":"Best for: Honeymoons, snow, scenery & family trips","images":["https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1566837497312-7be4a2b0d67b?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1626621331169-5f34be280ed9?auto=format&fit=crop&w=1000&q=85"]},"Bali":{"tag":"Beaches • Temples • Tropical Life","desc":"Bali combines tropical beaches, spiritual temples, green rice terraces and lively resort areas. It works equally well for honeymooners, friends, wellness escapes and first-time international travellers.","best":"Best for: Couples, beaches, culture & wellness","images":["https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=85"]},"Dubai":{"tag":"Luxury • Desert • Experiences","desc":"Dubai pairs futuristic architecture and luxury shopping with desert adventures, beaches and family attractions. It is a compact destination where sightseeing, entertainment and premium experiences fit easily into one holiday.","best":"Best for: Families, luxury, shopping & entertainment","images":["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85"]},"Sikkim":{"tag":"Himalayas • Monasteries • Lakes","desc":"Sikkim is a peaceful Himalayan escape filled with mountain views, Buddhist monasteries, alpine lakes and winding scenic roads. Gangtok and Pelling make excellent bases for exploring the region.","best":"Best for: Mountains, nature, couples & peaceful trips","images":["https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1581791538302-03537b9c97bf?auto=format&fit=crop&w=1000&q=85"]},"Rajasthan":{"tag":"Forts • Palaces • Desert","desc":"Rajasthan is India's grand stage of forts, palaces, colourful bazaars and desert landscapes. Jaipur, Jodhpur and Udaipur offer a strong mix of heritage, food, architecture and memorable stays.","best":"Best for: Heritage, families, photography & culture","images":["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1000&q=85"]},"Andaman & Nicobar":{"tag":"Islands • Beaches • Blue Water","desc":"The Andaman Islands offer clear water, soft beaches, tropical greenery and relaxed island hopping. Port Blair, Havelock and Neil Island create an easy mix of history, beaches and water experiences.","best":"Best for: Couples, beaches, water activities & families","images":["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85"]},"Uttarakhand":{"tag":"Mountains • Rivers • Spirituality","desc":"Uttarakhand moves from peaceful hill stations to Himalayan landscapes and the spiritual energy of the Ganga. Nainital, Mussoorie and Rishikesh make a versatile itinerary for different travel styles.","best":"Best for: Families, mountains, spirituality & adventure","images":["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85"]},"Singapore":{"tag":"City • Gardens • Entertainment","desc":"Singapore is polished, compact and packed with experiences—from futuristic gardens and skyline views to Sentosa, food districts and family attractions. Its efficient transport makes short holidays especially easy.","best":"Best for: Families, first international trips & city breaks","images":["https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1525625293386-3f8f99389edd8?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=85"]},"Maldives":{"tag":"Resorts • Lagoons • Barefoot Luxury","desc":"The Maldives is built for switching off: turquoise lagoons, white sand, private resorts and spectacular sunsets. Resort selection is the heart of the experience, from romantic villas to family-friendly islands.","best":"Best for: Honeymoons, luxury, beaches & relaxation","images":["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=85"]},"Mauritius":{"tag":"Beaches • Landscapes • Island Culture","desc":"Mauritius combines beautiful beaches with green interiors, waterfalls, viewpoints and a multicultural food scene. It offers more sightseeing variety than a resort-only island holiday.","best":"Best for: Couples, families, beaches & sightseeing","images":["https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85"]},"Malaysia":{"tag":"Cities • Islands • Culture","desc":"Malaysia combines Kuala Lumpur's modern skyline with highland escapes, diverse food and tropical islands such as Langkawi. It is an easy multi-experience destination for couples and families.","best":"Best for: Families, city breaks, food & islands","images":["https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1508062878650-88b52897f298?auto=format&fit=crop&w=1000&q=85","https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=85"]}};
const destinationModal = document.getElementById("destinationModal");
const destinationModalClose = document.getElementById("destinationModalClose");
const destinationPlanBtn = document.getElementById("destinationPlanBtn");
let selectedDestination = "";

function openDestinationExplorer(name) {
    const d = destinationDetails[name];
    if (!d || !destinationModal) return;
    selectedDestination = name;
    document.getElementById("destinationModalTitle").textContent = name;
    document.getElementById("destinationModalTag").textContent = d.tag;
    document.getElementById("destinationModalDescription").textContent = d.desc;
    document.getElementById("destinationModalBest").textContent = d.best;

    const imgs = [
        document.getElementById("destinationMainImage"),
        document.getElementById("destinationImageTwo"),
        document.getElementById("destinationImageThree")
    ];
    imgs.forEach(function(img, i) {
        img.src = d.images[i];
        img.alt = name + " travel view " + (i + 1);
    });

    destinationModal.classList.add("is-open");
    destinationModal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
}

function closeDestinationExplorer() {
    if (!destinationModal) return;
    destinationModal.classList.remove("is-open");
    destinationModal.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
}

document.querySelectorAll(".destination[data-place]").forEach(function(card) {
    card.addEventListener("click", function(event) {
        event.preventDefault();
        openDestinationExplorer(card.dataset.place);
    });
});

if (destinationModalClose) destinationModalClose.addEventListener("click", closeDestinationExplorer);
if (destinationModal) destinationModal.addEventListener("click", function(event) {
    if (event.target === destinationModal) closeDestinationExplorer();
});
if (destinationPlanBtn) destinationPlanBtn.addEventListener("click", function() {
    closeDestinationExplorer();
    const destinationInput = document.getElementById("destination");
    if (destinationInput) destinationInput.value = selectedDestination;
    setTimeout(openTravelContact, 160);
});
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && destinationModal && destinationModal.classList.contains("is-open")) {
        closeDestinationExplorer();
    }
});

});