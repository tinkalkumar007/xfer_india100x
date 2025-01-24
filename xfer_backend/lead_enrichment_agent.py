import frappe
from playwright.sync_api import sync_playwright
def enrich_lead_profiles():
    # Step 1: Fetch leads with incomplete profiles
    leads = frappe.get_all("Lead", filters={"linkedin_url": ""}, fields=["name", "lead_name", "company_name", "primary_domain"])
    if not leads:
        frappe.log_error("No leads to enrich", "Lead Enrichment Agent")
        return
    # Step 2: Use Playwright to search for LinkedIn profiles
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        for lead in leads:
            try:
                # Perform Google search
                query = f"site:linkedin.com {lead['lead_name']} {lead['company_name'] or lead['primary_domain']}"
                google_search_url = f"https://www.google.com/search?q={query}"
                page.goto(google_search_url)
                # Extract the first LinkedIn result
                linkedin_url = page.locator("a[href*='linkedin.com/in']").first.get_attribute("href")
                if linkedin_url:
                    # Update the lead with the LinkedIn URL
                    frappe.db.set_value("Lead", lead["name"], "linkedin_url", linkedin_url)
                    frappe.db.commit()
                    print(f"Enriched Lead: {lead['lead_name']} - {linkedin_url}")
                else:
                    print(f"No LinkedIn profile found for {lead['lead_name']}")
            except Exception as e:
                frappe.log_error(f"Error enriching lead {lead['name']}: {str(e)}", "Lead Enrichment Agent")
        browser.close()