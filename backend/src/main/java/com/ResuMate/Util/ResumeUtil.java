package com.ResuMate.Util;

import com.ResuMate.Models.EducationModel;
import com.ResuMate.Models.ExperienceModel;
import com.ResuMate.Models.ProjectModel;
import com.ResuMate.Models.UserModel;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.action.PdfAction;
import com.itextpdf.kernel.pdf.canvas.draw.ILineDrawer;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import org.json.JSONArray;
import org.json.JSONObject;


import javax.swing.text.StyleConstants;
import java.io.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.Locale;


public class ResumeUtil {

    private static final String API_KEY = System.getenv("GEMINI_API_KEY");

    public static void fetchPromptResponse() throws IOException, InterruptedException {



    }


    public static byte[] generateResume(UserModel user) throws IOException {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);

        PdfFont timesRoman = PdfFontFactory.createFont(StandardFonts.TIMES_ROMAN);
        PdfFont timesBold = PdfFontFactory.createFont(StandardFonts.TIMES_BOLD);

        Link linkedInLink = new Link("LinkedIn", PdfAction.createURI(user.getLinkedIn()));
        Link portfolioLink = new Link("Portfolio", PdfAction.createURI(user.getWebsite()));

        document.add(new Paragraph(user.getFirstName() + " " + user.getLastName())
                .setFont(timesBold)
                .setFontSize(20)
                .setTextAlignment(TextAlignment.CENTER));
        document.add(new Paragraph(user.getPhone()  + " | " + user.getEmail() + " | ")
                .add(linkedInLink.setFontColor(new DeviceRgb(32, 69, 128)).setUnderline()).add(" | ")
                .add(portfolioLink.setFontColor(new DeviceRgb(32, 69, 128)).setUnderline())
                .setFontSize(11)
                .setTextAlignment(TextAlignment.CENTER));

        document.add(new Paragraph().setFixedLeading(10));
        document.add(getLineSeparator());

        document.add(new Paragraph().setFixedLeading(10));
        document.add(new Paragraph(user.getSummary()).setFont(timesRoman));
        document.add(new Paragraph().setFixedLeading(10));

        document.add(getLineSeparator());

        if( !user.getEducation().isEmpty() ){
            document.add(new Paragraph("\nEDUCATION:").setFont(timesBold).setFontSize(13));
            List educationList = new List();
            for (EducationModel edu : user.getEducation()) {
                educationList.add(new ListItem( edu.degree + " at " + edu.getInstitution() +
                        " (" + edu.getYear().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .getYear() + ")"));
            }
            document.add(educationList);
            document.add(new Paragraph().setFixedLeading(10));
        }

        document.add(new Paragraph().setFixedLeading(10));
        document.add(getLineSeparator());

        if( !user.getExperiences().isEmpty() ) {
            document.add(new Paragraph("\nEXPERIENCE:").setFont(timesBold).setFontSize(13));
            for (ExperienceModel exp : user.getExperiences()) {
                String startMonth = exp.getStartDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .getMonth()
                        .getDisplayName(TextStyle.FULL, Locale.ENGLISH);
                int startYear = exp.getStartDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .getYear();

                String endMonth = exp.getEndDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .getMonth()
                        .getDisplayName(TextStyle.FULL, Locale.ENGLISH);
                int endYear = exp.getEndDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .getYear();

                document.add(new Paragraph(exp.getRole() + " at " + exp.getCompany()
                        + " (" + startMonth + " " + startYear + " - " + endMonth + " " + endYear + ")").setBold());

                document.add(new ListItem(exp.getDescription()));
                document.add(new Paragraph().setFixedLeading(10));
            }
        }

        document.add(new Paragraph().setFixedLeading(10));
        document.add(getLineSeparator());

        if( !user.getProjects().isEmpty() ){
            document.add(new Paragraph("\nPROJECTS:").setFont(timesBold).setFontSize(13));
            for (ProjectModel proj : user.getProjects()) {
                document.add(new Paragraph(proj.projectName +" (" + proj.getProjectDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .getYear() +")").setBold());

                document.add(new Paragraph(proj.getProjectDescription()));
            }
            document.add(new Paragraph().setFixedLeading(10));
        }

        document.add(new Paragraph().setFixedLeading(10));

        document.close();
        return outputStream.toByteArray();

    }

    public static String generateContent() throws Exception {

        String content = "Tell me something about myself";
        String model = "gemini-2.0-flash";

        String BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";


        JSONObject textPart = new JSONObject();
        textPart.put("text", content);

        JSONObject parts = new JSONObject();
        parts.put("parts", new JSONArray().put(textPart));

        JSONObject contents = new JSONObject();
        contents.put("contents", new JSONArray().put(parts));

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + model + ":generateContent" + "?key=" + API_KEY))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(contents.toString(), StandardCharsets.UTF_8))
                .build();

        HttpResponse<String> httpResponse = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (httpResponse.statusCode() == 200) {
            JSONObject responseJson = new JSONObject(httpResponse.body());
            JSONArray candidates = responseJson.getJSONArray("candidates");

            if (!candidates.isEmpty()) {
                JSONObject contentBody = candidates.getJSONObject(0).getJSONObject("content");
                JSONArray part = contentBody.getJSONArray("parts");

                if (!parts.isEmpty()) {
                    String text = part.getJSONObject(0).getString("text");
                    System.out.println("Extracted Text: " + text);
                    return text;
                } else {
                    return "No text found in parts array.";
                }
            } else {
                return "No candidates found.";
            }
        } else {
            return "Error: " + httpResponse.statusCode() + " - " + httpResponse.body();
        }
    }

    private static LineSeparator getLineSeparator() {
        SolidLine line = new SolidLine(1);
        return new LineSeparator(line);
    }

}