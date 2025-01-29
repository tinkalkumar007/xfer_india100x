# Copyright (c) 2025, xfer and Contributors
# See license.txt

# import frappe
from frappe.tests import IntegrationTestCase, UnitTestCase


# On IntegrationTestCase, the doctype test records and all
# link-field test record dependencies are recursively loaded
# Use these module variables to add/remove to/from that list
EXTRA_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]
IGNORE_TEST_RECORD_DEPENDENCIES = []  # eg. ["User"]


class UnitTestOrderStatus(UnitTestCase):
	"""
	Unit tests for OrderStatus.
	Use this class for testing individual functions and methods.
	"""

	pass


class IntegrationTestOrderStatus(IntegrationTestCase):
	"""
	Integration tests for OrderStatus.
	Use this class for testing interactions between multiple components.
	"""

	pass
