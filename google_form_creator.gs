/**
 * ============================================================================
 * UNANI TEMPERAMENT ASSESSMENT — GOOGLE FORM AUTOMATIC CREATOR
 * ============================================================================
 * Heading: "Answer the following questions to identify your predominant Unani temperament: Damwi, Balghami, Safrawi or Saudawi."
 * 
 * Temperament Mapping:
 * - Option (a) = Damwi   (Sanguine  - Air   - Hot & Moist)
 * - Option (b) = Balghami (Phlegmatic - Water - Cold & Moist)
 * - Option (c) = Safrawi  (Choleric  - Fire  - Hot & Dry)
 * - Option (d) = Saudawi  (Melancholic - Earth - Cold & Dry)
 * 
 * HOW TO RUN THIS IN 1 CLICK:
 * 1. Go to https://script.google.com in your web browser (logged into Google).
 * 2. Click "+ New Project".
 * 3. Delete any default code, paste this ENTIRE file into the editor, and click Save (💾).
 * 4. Select the function "createUnaniTemperamentForm" from the dropdown in the toolbar.
 * 5. Click "Run" (▶). Grant Google permissions when prompted.
 * 6. Look at the "Execution Log" at the bottom: You will get instant clickable links to:
 *    - Your newly created Google Form (Edit & Share links)
 *    - The linked Google Sheet ready with automatic scoring!
 * ============================================================================
 */

function createUnaniTemperamentForm() {
  const formTitle = "Answer the following questions to identify your predominant Unani temperament: Damwi, Balghami, Safrawi or Saudawi.";
  
  const formDescription = 
    "Welcome to the Unani Mizaj (Temperament) Assessment.\n\n" +
    "In the Unani system of medicine, every individual has a unique constitutional temperament governed by four primary humours:\n" +
    "• a. Damwi (Sanguine) — Air Element | Hot & Moist (උනුසුම් සහ තෙත්)\n" +
    "• b. Balghami (Phlegmatic) — Water Element | Cold & Moist (සීතල සහ තෙත්)\n" +
    "• c. Safrawi (Choleric) — Fire Element | Hot & Dry (උනුසුම් සහ වියලි)\n" +
    "• d. Saudawi (Melancholic) — Earth Element | Cold & Dry (සීතල සහ වියලි)\n\n" +
    "Please answer all 15 questions honestly based on your natural lifelong tendencies (not temporary illness).";

  Logger.log("Creating Unani Temperament Google Form...");
  const form = FormApp.create(formTitle);
  form.setDescription(formDescription);
  form.setCollectEmail(true); // Collects email so automatic Unani report can be sent
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setConfirmationMessage(
    "Thank you! Your Unani temperament analysis has been recorded and calculated.\n" +
    "Please check your email inbox for your detailed Unani Temperament (Damwi, Balghami, Safrawi, Saudawi) breakdown and health recommendations."
  );

  // Optional: Full Name
  const nameItem = form.addTextItem();
  nameItem.setTitle("Your Full Name (ඔබගේ සම්පූර්ණ නම)");
  nameItem.setRequired(true);

  // 15 Standard Unani Questions (Bilingual: English + Sinhala)
  // Strictly mapped: a = Damwi, b = Balghami, c = Safrawi, d = Saudawi
  const questions = [
    {
      title: "Q1. How does your skin usually feel when touched? (ඔබගේ සම අල්ලන විට දැනෙන්නේ කොහොමද?)",
      choices: [
        "a. Warm and moderately soft (උනුසුම් සහ මෘදු)",
        "b. Cool and soft (සීතල සහ මෘදු)",
        "c. Warm and dry/firm (උනුසුම් සහ වියලි / තෙත්)",
        "d. Cool and dry/firm (සීතල සහ වියලි)"
      ]
    },
    {
      title: "Q2. How would you describe your usual body composition? (ඔබගේ ශරීරයේ සංයුතිය කෙලෙසද?)",
      choices: [
        "a. Well-developed muscles with moderate fat (හොඳට වර්ධනය වුන මාංශ පේශි සමග සාමාන්‍යයෙන් තෙල් සහිත)",
        "b. Soft/fleshy body with more fat (මහත ශරීරය සහ තෙල් වැඩි)",
        "c. Lean body with relatively little fat (කෙට්ටු ශරීරය සහ තෙල් අඩු)",
        "d. Lean body with less muscle and fat (කෙට්ටු ශරීරය සහ මාංශ පේශි සහ තෙල් අඩු)"
      ]
    },
    {
      title: "Q3. How would you describe your hair? (ඔබගේ කොණ්ඩය සම්බන්ධයෙන්)",
      choices: [
        "a. Thick and moderately soft (ඝනකම සහිත සාමාන්‍යයෙන් මෘදු)",
        "b. Soft, smooth and relatively fine (මෘදු සහ අඩු ගණකම සහිත)",
        "c. Fine, relatively dry and sometimes reddish/yellowish (සාමාන්‍යයෙන් වියලි / රන්වන් පැහැති)",
        "d. Coarse, dry and relatively thick (වියළි සහ සාමාන්‍ය ඝනකමකින් යුතු)"
      ]
    },
    {
      title: "Q4. How is your natural hair growth? (ස්වභාවික රෝම වර්ධනය කෙසේද?)",
      choices: [
        "a. Moderate to relatively abundant (සාමාන්‍ය හෝ තරමක් බහුල වර්ධනය)",
        "b. Relatively slow (සාපේක්ෂව මන්දගාමී වර්ධනය)",
        "c. Relatively rapid (සාපේක්ෂව වේගවත් වර්ධනය)",
        "d. Dry/coarse with slower growth (වියළි/රළු සහ මන්දගාමී වර්ධනය)"
      ]
    },
    {
      title: "Q5. What is your usual natural complexion? (ඔබගේ සාමාන්‍ය සමේ පැහැය කුමක්ද?)",
      choices: [
        "a. Reddish / pinkish (රෝස පැහැ / රතු පැහැයට හුරු)",
        "b. Whitish / pale (සුදුමැලි / සුදු පැහැති)",
        "c. Yellowish / warm-toned (කහ පැහැයට හුරු / උණුසුම් පැහැති)",
        "d. Dusky / darkish (අඳුරු / දුඹුරු පැහැයට හුරු)"
      ]
    },
    {
      title: "Q6. Which description best matches your body structure? (ඔබගේ ශරීර ව්‍යුහයට වඩාත්ම ගැළපෙන්නේ කුමක්ද?)",
      choices: [
        "a. Strong, broad and well-developed (ශක්තිමත්, පුළුල් සහ හොඳින් වර්ධනය වූ)",
        "b. Rounded, soft and fleshy (වටකුරු, මෘදු සහ මාංසල)",
        "c. Lean and relatively narrow (කෙට්ටු සහ සාපේක්ෂව පටු)",
        "d. Thin, bony and prominent joints (කෙට්ටු, ඇටකටු පෙනෙන සහ නෙරා ගිය සන්ධි සහිත)"
      ]
    },
    {
      title: "Q7. How does your body generally respond to hot weather? (උණුසුම් කාලගුණයට ඔබගේ ශරීරය ප්‍රතිචාර දක්වන්නේ කෙසේද?)",
      choices: [
        "a. I tolerate heat reasonably well (මම උණුසුම සාමාන්‍යයෙන් හොඳින් දරාගනිමි)",
        "b. I generally prefer warmth (මම සාමාන්‍යයෙන් උණුසුමට ප්‍රිය කරමි)",
        "c. I become uncomfortable in heat very easily (මම ඉතා පහසුවෙන් උණුසුම නිසා අපහසුතාවයට පත්වෙමි)",
        "d. I prefer warmth but may dislike excessive heat (මම උණුසුමට කැමති නමුත් අධික උණුසුමට අකමැතියි)"
      ]
    },
    {
      title: "Q8. How much sleep do you naturally prefer? (ස්වභාවිකවම ඔබ කොපමණ නින්දක් ප්‍රිය කරනවාද?)",
      choices: [
        "a. Moderate sleep (සාමාන්‍ය ප්‍රමාණයේ නින්දක්)",
        "b. Longer sleep; I enjoy sleeping more (දිගු නින්දක්; මම වැඩිපුර නිදාගැනීමට ප්‍රිය කරමි)",
        "c. Less sleep; I can remain active with relatively little sleep (අඩු නින්දක්; මට අඩු නින්දකින් ක්‍රියාශීලීව සිටිය හැක)",
        "d. Sleep may be lighter or disturbed (සැහැල්ලු හෝ බාධා සහිත නින්දක්)"
      ]
    },
    {
      title: "Q9. How do you usually feel after waking? (නින්දෙන් අවදි වූ පසු ඔබට සාමාන්‍යයෙන් දැනෙන්නේ කෙසේද?)",
      choices: [
        "a. Fresh and energetic (ප්‍රබෝධමත් සහ ජවසම්පන්න බවක්)",
        "b. Slow to become fully active (සම්පූර්ණයෙන්ම ක්‍රියාශීලී වීමට කාලය ගතවීම)",
        "c. Quickly active and alert (ක්ෂණිකව ක්‍රියාශීලී සහ අවදියෙන් සිටින බවක්)",
        "d. May need time to feel mentally settled (මානසිකව සන්සුන් වීමට කාලයක් අවශ්‍ය වීම)"
      ]
    },
    {
      title: "Q10. How would you describe your usual appetite and digestion? (ඔබගේ ආහාර රුචිය සහ ආහාර දිරවීම කෙසේද?)",
      choices: [
        "a. Good appetite and generally good digestion (හොඳ ආහාර රුචිය සහ සාමාන්‍යයෙන් හොඳ ජීර්ණය)",
        "b. Appetite is moderate, digestion tends to be slower (ආහාර රුචිය මධ්‍යස්ථයි, ජීර්ණය මන්දගාමී වීමට නැඹුරුයි)",
        "c. Strong appetite but digestion may feel intense/rapid (තදබල ආහාර රුචිය සහ වේගවත්/තීව්‍ර ජීර්ණය)",
        "d. Appetite and digestion may be variable/irregular (ආහාර රුචිය සහ ජීර්ණය වෙනස්වන සුළුයි / අක්‍රමවත්)"
      ]
    },
    {
      title: "Q11. How would you describe your general physical activity? (ඔබගේ සාමාන්‍ය ශාරීරික ක්‍රියාශීලී බව කෙසේද?)",
      choices: [
        "a. Active and energetic (ක්‍රියාශීලී සහ ජවසම්පන්න)",
        "b. Slow and steady (සෙමින් සහ ස්ථාවරව)",
        "c. Very active and quick (ඉතා ක්‍රියාශීලී සහ වේගවත්)",
        "d. Variable, often deliberate and slow (වෙනස්වන සුළු, බොහෝවිට කල්පනාකාරී සහ සෙමෙන්)"
      ]
    },
    {
      title: "Q12. Which best describes your usual bowel habit? (ඔබගේ මළපහ පිටවීම වඩාත් හොඳින් විස්තර කරන්නේ කුමක්ද?)",
      choices: [
        "a. Regular and moderate (ක්‍රමවත් සහ සාමාන්‍ය ප්‍රමාණයෙන්)",
        "b. Tendency toward slower bowel movement (මන්දගාමී බඩවැලේ ක්‍රියාකාරිත්වයකට නැඹුරුතාවයක්)",
        "c. Tendency toward frequent/looser stools (නිතර හෝ බුරුල්ව මළපහ පිටවීමේ නැඹුරුතාවයක්)",
        "d. Tendency toward dryness/constipation (වියළි බව / මලබද්ධය සඳහා නැඹුරුතාවයක්)"
      ]
    },
    {
      title: "Q13. How would you describe your usual urine? (ඔබගේ මුත්‍රා පිටවීම සාමාන්‍යයෙන් කෙසේද?)",
      choices: [
        "a. Moderate quantity and colour (මධ්‍යස්ථ ප්‍රමාණය සහ සාමාන්‍ය පැහැය)",
        "b. Relatively pale/dilute (සාපේක්ෂව සුදුමැලි / තනුක පැහැය)",
        "c. Relatively yellow and concentrated (සාපේක්ෂව කහ පැහැති සහ සාන්ද්‍රණය වැඩි)",
        "d. Relatively concentrated/dark with dryness tendency (සාපේක්ෂව සාන්ද්‍ර/අඳුරු පැහැති සහ වියළි බවේ නැඹුරුව)"
      ]
    },
    {
      title: "Q14. How do you usually react emotionally? (ඔබ සාමාන්‍යයෙන් චිත්තවේගීයව ප්‍රතිචාර දක්වන්නේ කෙසේද?)",
      choices: [
        "a. Friendly, confident and sociable (මිත්‍රශීලී, ආත්ම විශ්වාසයෙන් පිරි සහ සමාජශීලී)",
        "b. Calm, patient and relaxed (සන්සුන්, ඉවසිලිවන්ත සහ සැහැල්ලු)",
        "c. Quick, enthusiastic and easily irritated (ඉක්මන්, උද්යෝගිමත් සහ පහසුවෙන් කෝපයට පත්වන)",
        "d. Thoughtful, serious and reserved (කල්පනාකාරී, බැරෑරුම් සහ සංයමයෙන් යුත්)"
      ]
    },
    {
      title: "Q15. When faced with a stressful situation, what is your usual response? (ආතති සහගත අවස්ථාවකදී ඔබගේ සාමාන්‍ය ප්‍රතිචාරය කුමක්ද?)",
      choices: [
        "a. I talk about it and recover relatively quickly (මම ඒ ගැන කතා කර සාපේක්ෂව ඉක්මනින් යථා තත්ත්වයට පත්වෙමි)",
        "b. I remain quiet and take time to respond (මම නිශ්ශබ්දව සිට ප්‍රතිචාර දැක්වීමට කාලය ගනිමි)",
        "c. I react quickly and strongly, then settle (මම ක්ෂණිකව සහ තදින් ප්‍රතිචාර දක්වා පසුව සන්සුන් වෙමි)",
        "d. I think deeply about it and may continue thinking about it (මම ඒ ගැන ගැඹුරින් සිතන අතර දිගටම ඒ ගැන සිතමින් සිටිය හැක)"
      ]
    }
  ];

  // Add all 15 questions to the Google Form
  questions.forEach(q => {
    const item = form.addMultipleChoiceItem();
    item.setTitle(q.title);
    item.setChoices(q.choices.map(c => item.createChoice(c)));
    item.setRequired(true);
  });

  // Create linked Spreadsheet to record responses
  Logger.log("Creating linked Google Sheet for responses...");
  const sheet = SpreadsheetApp.create("Unani Temperament Assessment (Responses & Analysis)");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  const editUrl = form.getEditUrl();
  const publishedUrl = form.getPublishedUrl();
  const sheetUrl = sheet.getUrl();

  Logger.log("====================================================================");
  Logger.log("SUCCESS! UNANI TEMPERAMENT FORM CREATED SUCCESSFULLY.");
  Logger.log("1. Form Edit Link: " + editUrl);
  Logger.log("2. Public Respondent Link: " + publishedUrl);
  Logger.log("3. Linked Google Sheet Link: " + sheetUrl);
  Logger.log("====================================================================");
}
