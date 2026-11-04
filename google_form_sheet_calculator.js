/**
 * ============================================================================
 * UNANI TEMPERAMENT (MIZAJ) AUTOMATIC CALCULATOR FOR GOOGLE FORMS & SHEETS
 * ============================================================================
 * 
 * Temperaments Evaluated:
 * - Damwi (Sanguine)    -> Option (a) | Element: Air   | Quality: Hot & Moist
 * - Balghami (Phlegmatic) -> Option (b) | Element: Water | Quality: Cold & Moist
 * - Safrawi (Choleric)  -> Option (c) | Element: Fire  | Quality: Hot & Dry
 * - Saudawi (Melancholic)-> Option (d) | Element: Earth | Quality: Cold & Dry
 * 
 * HOW TO INSTALL IN GOOGLE SHEETS:
 * 1. Open the Google Sheet connected to your Google Form.
 * 2. Click "Extensions" -> "Apps Script" in the top menu.
 * 3. Delete any default code, paste this entire file, and click Save (💾).
 * 4. Click the Triggers icon (⏰ clock on the left sidebar).
 * 5. Click "+ Add Trigger" (bottom right):
 *    - Function to run: onFormSubmit
 *    - Deployment: Head
 *    - Event source: From spreadsheet
 *    - Event type: On form submit
 * 6. Click "Save" and authorize permissions.
 * 
 * Every time someone submits your form, their dominant Unani temperament
 * will be automatically calculated, logged to the Sheet, and emailed to them!
 * ============================================================================
 */

const UNANI_TEMPERAMENTS = {
  DAMWI: {
    code: "Damwi (Sanguine / خلط الدم)",
    sinhala: "දම්වී (ලේ ප්‍රමුඛ ස්වභාවය)",
    element: "Air (වායුව)",
    qualities: "Hot & Moist (උනුසුම් සහ තෙත්)",
    tagline: "Friendly, Energetic, Muscular & Sociable",
    description: "You have a predominantly Damwi (Sanguine) temperament. You are naturally warm-hearted, cheerful, sociable, and energetic. Physically, you tend to have a muscular, well-developed build with a rosy or warm complexion. You have a strong digestive system, good stamina, and generally enjoy peaceful, deep sleep.",
    recommendations: "To maintain humoral balance, avoid excessive intake of heavy red meats, overly oily or excessively spicy foods. Favor cooling and fresh foods such as barley, cucumbers, pomegranates, citrus, leafy greens, and engage in regular moderate physical exercise."
  },
  BALGHAMI: {
    code: "Balghami (Phlegmatic / خلط البلغم)",
    sinhala: "බල්ගමී (සෙම ප්‍රමුඛ ස්වභාවය)",
    element: "Water (ජලය)",
    qualities: "Cold & Moist (සීතල සහ තෙත්)",
    tagline: "Calm, Patient, Composed & Peaceful",
    description: "You have a predominantly Balghami (Phlegmatic) temperament. You possess a calm, patient, and easy-going nature, avoiding unnecessary conflict. Physically, your body tends to be soft, fleshy, or rounded, with a fair or pale complexion. You enjoy longer sleep, have a steady, slower digestion, and prefer warm, comforting environments.",
    recommendations: "To avoid sluggishness and phlegm accumulation, keep active and favor warming, dry, and light foods. Spices like ginger, cinnamon, black pepper, garlic, and honey are highly beneficial. Minimize cold beverages, ice cream, dairy excess, and prolonged daytime sleep."
  },
  SAFRAWI: {
    code: "Safrawi (Choleric / خلط الصفراء)",
    sinhala: "සෆ්රාවී (පිත ප්‍රමුඛ ස්වභාවය)",
    element: "Fire (ගින්දර)",
    qualities: "Hot & Dry (උනුසුම් සහ වියලි)",
    tagline: "Ambitious, Quick-Witted, Sharp & Decisive",
    description: "You have a predominantly Safrawi (Choleric) temperament. You are dynamic, passionate, alert, and ambitious with sharp leadership and rapid decision-making skills. Physically, you tend to be lean with warm, dry skin and a yellowish or warm-toned complexion. Your metabolism is quick and intense, but you may get irritated easily under stress.",
    recommendations: "To prevent excess heat and acidity, consume cooling, hydrating, and soothing foods. Good choices include melons, cucumbers, buttermilk, mint, coriander, and coconut water. Avoid excessively fried, pungent, or salty foods, and avoid prolonged exposure to direct midday sun."
  },
  SAUDAWI: {
    code: "Saudawi (Melancholic / خلط السوداء)",
    sinhala: "සවුදාවී (කළු පිත ප්‍රමුඛ ස්වභාවය)",
    element: "Earth (පෘථිවිය)",
    qualities: "Cold & Dry (සීතල සහ වියලි)",
    tagline: "Thoughtful, Analytical, Deep & Reserved",
    description: "You have a predominantly Saudawi (Melancholic) temperament. You are an introspective, philosophical deep thinker who is thorough, detail-oriented, and sincere. Physically, you tend to have a slender, bony build with prominent joints and cool, dry skin. Under pressure, you may lean toward overthinking, worry, or light sleep.",
    recommendations: "To balance cold and dry qualities, nourish your body with warm, moist, unctuous foods such as warm soups, almonds, dates, olive oil, and warm milk with cardamom. Practice relaxation techniques, maintain regular sleep hours, and surround yourself with uplifting, positive company."
  }
};

/**
 * Automatically triggered when a Google Form submission is received
 */
function onFormSubmit(e) {
  if (!e) {
    Logger.log("Notice: This function should run via the spreadsheet 'On Form Submit' trigger.");
    return;
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  // Required summary columns
  const analysisHeaders = [
    "Damwi Score (a)",
    "Balghami Score (b)",
    "Safrawi Score (c)",
    "Saudawi Score (d)",
    "Predominant Temperament",
    "Temperament Qualities",
    "Health & Dietary Advice"
  ];
  
  ensureHeaderColumns(sheet, headers, analysisHeaders);

  const row = e.range.getRow();
  const rowValues = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];

  let countDamwi = 0;   // Option a
  let countBalghami = 0; // Option b
  let countSafrawi = 0;  // Option c
  let countSaudawi = 0;  // Option d
  let userEmail = "";
  let respondentName = "";

  for (let col = 0; col < headers.length; col++) {
    const header = String(headers[col]).trim().toLowerCase();
    const val = String(rowValues[col]).trim();

    // Capture email
    if ((header.includes("email") || header.includes("ඊමේල්")) && val.includes("@")) {
      userEmail = val;
    }
    // Capture name
    if (header.includes("name") || header.includes("නම")) {
      respondentName = val;
    }

    // Identify selection based on prefix (a, b, c, d)
    if (/^[aA][\.\)\s\-\:\,]|^[aA]$/i.test(val) || /^a\b/i.test(val)) {
      countDamwi++;
    } else if (/^[bB][\.\)\s\-\:\,]|^[bB]$/i.test(val) || /^b\b/i.test(val)) {
      countBalghami++;
    } else if (/^[cC][\.\)\s\-\:\,]|^[cC]$/i.test(val) || /^c\b/i.test(val)) {
      countSafrawi++;
    } else if (/^[dD][\.\)\s\-\:\,]|^[dD]$/i.test(val) || /^d\b/i.test(val)) {
      countSaudawi++;
    }
  }

  // Rank the four temperaments
  const scoreBoard = [
    { key: "Damwi", count: countDamwi, ...UNANI_TEMPERAMENTS.DAMWI },
    { key: "Balghami", count: countBalghami, ...UNANI_TEMPERAMENTS.BALGHAMI },
    { key: "Safrawi", count: countSafrawi, ...UNANI_TEMPERAMENTS.SAFRAWI },
    { key: "Saudawi", count: countSaudawi, ...UNANI_TEMPERAMENTS.SAUDAWI }
  ].sort((t1, t2) => t2.count - t1.count);

  const primary = scoreBoard[0];
  let dominantLabel = primary.code;
  let dominantQualities = primary.qualities;
  let advice = primary.recommendations;

  // Check for dual/compound temperament tie (common in Unani medicine, e.g., Damwi-Safrawi)
  if (scoreBoard[0].count === scoreBoard[1].count) {
    dominantLabel = `Compound (Murakkab): ${scoreBoard[0].key} - ${scoreBoard[1].key}`;
    dominantQualities = `${scoreBoard[0].qualities} & ${scoreBoard[1].qualities}`;
    advice = `Primary: ${scoreBoard[0].recommendations}\nSecondary: ${scoreBoard[1].recommendations}`;
  }

  // Write scores and analysis into the spreadsheet row
  const startCol = sheet.getLastColumn() - 6;
  sheet.getRange(row, startCol, 1, 7).setValues([[
    countDamwi,
    countBalghami,
    countSafrawi,
    countSaudawi,
    dominantLabel,
    dominantQualities,
    advice
  ]]);

  // Automatically send detailed Unani Temperament Report via email if address exists
  if (userEmail) {
    try {
      sendUnaniResultEmail(userEmail, respondentName, primary, scoreBoard, dominantLabel);
      Logger.log("Unani report successfully emailed to: " + userEmail);
    } catch (err) {
      Logger.log("Email sending error: " + err.message);
    }
  }
}

/**
 * Ensure analysis header columns are created at the end of the sheet
 */
function ensureHeaderColumns(sheet, currentHeaders, requiredHeaders) {
  let lastCol = sheet.getLastColumn();
  const missing = requiredHeaders.filter(h => !currentHeaders.includes(h));

  if (missing.length > 0) {
    for (let i = 0; i < missing.length; i++) {
      const cell = sheet.getRange(1, lastCol + 1 + i);
      cell.setValue(missing[i]);
      cell.setFontWeight("bold");
      cell.setBackground("#D1E7DD"); // Soft unani green
      cell.setFontColor("#0F5132");
    }
  }
}

/**
 * Send an elegant HTML Unani Temperament Report to respondent
 */
function sendUnaniResultEmail(email, name, primary, scoreBoard, dominantLabel) {
  const greeting = name ? `Dear ${name},` : "Dear Participant,";
  const subject = `Your Unani Temperament Result: ${dominantLabel}`;
  
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: auto; padding: 25px; border: 1px solid #d1d5db; border-radius: 14px; background: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="font-size: 13px; font-weight: bold; color: #047857; text-transform: uppercase; letter-spacing: 1.5px;">Unani Tibb Constitutional Medicine</span>
        <h2 style="color: #111827; margin: 6px 0 0 0; font-size: 22px;">Mizaj (Temperament) Assessment Report</h2>
      </div>

      <p style="font-size: 15px; color: #374151; line-height: 1.5;">${greeting}</p>
      <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
        Based on your answers to the 15 diagnostic questions, here is the official breakdown of your predominant Unani temperament:
      </p>
      
      <!-- Dominant Badge -->
      <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 22px; border-radius: 12px; color: #ffffff; margin: 20px 0;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; background: rgba(255,255,255,0.22); padding: 4px 10px; border-radius: 20px;">Predominant Temperament</span>
        <h3 style="margin: 8px 0 4px 0; font-size: 24px; color: #ffffff;">${primary.code}</h3>
        <p style="margin: 0; font-size: 13px; opacity: 0.95;">${primary.sinhala} • Element: ${primary.element} • Quality: ${primary.qualities}</p>
        <p style="margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">${primary.tagline}</p>
      </div>

      <!-- Description -->
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 15px;">Personality & Physical Profile:</h4>
        <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0;">
          ${primary.description}
        </p>
      </div>

      <!-- Score Table -->
      <h4 style="color: #111827; margin: 25px 0 10px 0;">Your 15-Question Temperament Distribution:</h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f3f4f6; text-align: left; color: #374151;">
            <th style="padding: 10px; border: 1px solid #e5e7eb;">Temperament</th>
            <th style="padding: 10px; border: 1px solid #e5e7eb;">Quality</th>
            <th style="padding: 10px; border: 1px solid #e5e7eb;">Score</th>
            <th style="padding: 10px; border: 1px solid #e5e7eb;">Share (%)</th>
          </tr>
        </thead>
        <tbody>
          ${scoreBoard.map(item => `
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 600; color: #111827;">${item.code}</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb; color: #4b5563;">${item.qualities}</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; color: #047857;">${item.count} / 15</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 600;">${Math.round((item.count / 15) * 100)}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Lifestyle & Dietary Advice -->
      <div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #854d0e; font-size: 15px;">🌿 Dietary & Lifestyle (Ilaj-bil-Tadbeer) Advice:</h4>
        <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0;">
          ${primary.recommendations}
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0 15px 0;" />
      <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
        Unani Tibb Temperament Evaluation System • Designed for holistic health and self-discovery.
      </p>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}
