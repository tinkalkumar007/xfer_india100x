// Copyright (c) 2025, xfer and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customers', {
    refresh(frm) {
        if (frm.doc.first_name || frm.doc.last_name) {
            set_full_name(frm);
        }
    },
    first_name: function(frm) {
        set_full_name(frm);
    },
    last_name: function(frm) {
        set_full_name(frm);
    }
});

function set_full_name(frm) {
    let full_name = (frm.doc.first_name || "") + " " + (frm.doc.last_name || "");
    frm.set_value('full_name', full_name.trim());
}
