import unittest

from app import app


class PortfolioTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_index(self):
        rv = self.app.get('/', follow_redirects=True)
        self.assertEqual(rv.status_code, 200)

    def tearDown(self):
        pass

if __name__ == '__main__':
    unittest.main()
