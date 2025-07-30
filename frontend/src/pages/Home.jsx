import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-300 to-blue-600 text-center text-white py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Bring Hope to <span className="text-blue-900">Children in Need</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Your donations help provide shelter, education, and care for children in orphanages across the country.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded shadow">
              Donate Now
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-900 font-semibold py-3 px-6 rounded shadow">
              Learn More
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-blue-50 py-12 px-4 text-center">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-3xl font-bold text-blue-900">42</h3>
              <p className="text-gray-700 mt-2">Orphanages Supported</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-3xl font-bold text-blue-900">1,250+</h3>
              <p className="text-gray-700 mt-2">Children Helped</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-3xl font-bold text-blue-900">$2.5M</h3>
              <p className="text-gray-700 mt-2">Raised This Year</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-3xl font-bold text-blue-900">98%</h3>
              <p className="text-gray-700 mt-2">Donations to Programs</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-6xl mx-auto py-16 px-4 md:flex md:items-center md:space-x-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">About Hope Haven</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2010, Hope Haven connects compassionate donors with verified children's homes and orphanages across Kenya. Our mission is to ensure every child has access to safe shelter, nutritious food, quality education, and loving care.
            </p>
            <p className="text-gray-700 mb-4">
              We carefully vet each partner organization to ensure they meet our high standards of care, transparency, and financial accountability. Our team regularly visits each home to monitor progress and assess needs.
            </p>
            <p className="text-gray-700">
              To date, we've facilitated over $12 million in donations, directly impacting the lives of more than 5,000 children. 98% of every donation goes directly to program services.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Children raising hands"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Stories Section */}
        <section className="bg-blue-50 py-16 px-4 text-center max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Stories of Hope</h2>
          <p className="text-gray-700 mb-12">Hear from those whose lives have been changed</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow text-left">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Sarah J."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Sarah J.</h3>
                  <p className="text-blue-600 text-sm">Donor since 2018</p>
                </div>
              </div>
              <p className="italic text-gray-700">
                "Visiting Sunshine Children's Home was a life-changing experience. Seeing the direct impact of my donations on these children's lives has been incredibly rewarding. I now sponsor two children's education and visit regularly."
              </p>
              <div className="mt-4 text-yellow-400">
                ★★★★★
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-left">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                  alt="Michael T."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Michael T.</h3>
                  <p className="text-blue-600 text-sm">Volunteer & Donor</p>
                </div>
              </div>
              <p className="italic text-gray-700">
                "I started with a small monthly donation, but after seeing the transparency and real impact, I increased my contribution and now volunteer monthly. The staff's dedication is inspiring, and the children's progress is remarkable."
              </p>
              <div className="mt-4 text-yellow-400">
                ★★★★☆
              </div>
            </div>
          </div>
        </section>

        {/* Donation Info Section */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">How Your Donation Helps</h2>
          <p className="text-center text-gray-700 mb-12">Every contribution makes a real difference in a child's life</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="bg-blue-100 p-6 rounded-lg shadow">
              <div className="bg-blue-600 text-white w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Nutritious Meals</h3>
              <p className="text-gray-700 text-sm">$25 provides a week's worth of healthy meals for one child</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow">
              <div className="bg-blue-600 text-white w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 21.75a11.952 11.952 0 01-6.825-3.693 12.083 12.083 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Education</h3>
              <p className="text-gray-700 text-sm">$50 covers school supplies and books for a semester</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow">
              <div className="bg-blue-600 text-white w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Safe Shelter</h3>
              <p className="text-gray-700 text-sm">$100 helps maintain safe living conditions for a month</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow">
              <div className="bg-blue-600 text-white w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 21.75a11.952 11.952 0 01-6.825-3.693 12.083 12.083 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Healthcare</h3>
              <p className="text-gray-700 text-sm">$75 provides medical care and supplies</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow">
              <div className="bg-blue-600 text-white w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Clothing</h3>
              <p className="text-gray-700 text-sm">$40 provides clothing and essentials</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow">
              <div className="bg-blue-600 text-white w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 21.75a11.952 11.952 0 01-6.825-3.693 12.083 12.083 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Vocational Training</h3>
              <p className="text-gray-700 text-sm">$60 provides skills training for future employment</p>
            </div>
          </div>
        </section>

        {/* Partner Orphanages Section */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Our Partner Orphanages</h2>
          <p className="text-center text-gray-700 mb-12">Find a children's home to support with your donation</p>
          {/* Placeholder for orphanage cards or list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example orphanage card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Sunshine Children's Home</h3>
              <p className="text-gray-700">Providing shelter and education since 2005.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Hope Springs Orphanage</h3>
              <p className="text-gray-700">Supporting over 100 children with healthcare and education.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Bright Future Home</h3>
              <p className="text-gray-700">Focused on vocational training and life skills.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
