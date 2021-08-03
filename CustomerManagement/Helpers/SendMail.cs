using System;
using System.IO;
using System.Text;
using System.Data;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;
using System.Xml;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;

public  class SendMail
{
    private IConfiguration _config;

    public SendMail(IConfiguration config)
    {
        _config = config;
    }

    public async System.Threading.Tasks.Task SendAdminComment(string content, string email, string name)
    {
           await SendPDFEmailAsync(content, email,name);
        
    }

    private async System.Threading.Tasks.Task SendPDFEmailAsync(string content, string email, string name)
    {
        using (StringWriter sw = new StringWriter())
        {
            using (XmlTextWriter hw = new XmlTextWriter(sw))
            {
                string companyName = "Customer Management";
                string CustomerName = name;
                StringBuilder sb = new StringBuilder();
                sb.Append("<table width='100%' cellspacing='0' cellpadding='2'>");
                sb.Append("<tr><td align='center' style='background-color: #18B5F0' colspan = '2'><b>Admin Message Sheet</b></td></tr>");
                sb.Append("<tr><td colspan = '2'></td></tr>");
                sb.Append("<tr><td><b>Customer Name:</b>");
                sb.Append(CustomerName);
                sb.Append("</td><td><b>Date: </b>");
                sb.Append(DateTime.Now);
                sb.Append(" </td></tr>");
                sb.Append("<tr><td colspan = '2'><b>Company Name :</b> ");
                sb.Append(companyName);
                sb.Append("</td></tr>");
                sb.Append("<tr><td colspan = '2'><b>Admin Comment :</b> ");
                sb.Append(content);
                sb.Append("</td></tr>");
                sb.Append("</table>");
                sb.Append("<br />");
                StringReader sr = new StringReader(sb.ToString());

                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);

                    pdfDoc.Open();
                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    byte[] bytes = memoryStream.ToArray();
                    memoryStream.Close();

                    const string subject = "CM - Admin Message.";
                    var body = "<html><body>" +
                               "<h1>Please find attached.</h1>" +
                               "</body></html>";

                    var apiKey = _config.GetValue<String>("SendGridKey");
                    var client = new SendGridClient(apiKey);
                    var msg = new SendGridMessage()
                    {
                        From = new EmailAddress("CustomerManagement@testingmail.com", "CustomerManagement"),
                        Subject = subject,
                        HtmlContent = body
                    };
                    msg.AddTo(new EmailAddress(email));
                    var file = Convert.ToBase64String(bytes);
                    msg.AddAttachment("Admin Message.pdf", file);
                    var response = await client.SendEmailAsync(msg);
                }
            }
        }
    }
}