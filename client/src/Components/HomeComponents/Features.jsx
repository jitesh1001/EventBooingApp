import React from "react";

const Features = () => {
  const data = [
    {
      title: "Fast Booking",
      desc: "Secure your tickets instantly with our fast streamlined booking infrastructure built for speed.",
      icon: "⏱️",
    },
    {
      title: "Seamless Access",
      desc: "Download tickets instantly or manage them right from your personal dashboard with easily.",
      icon: "🎟️",
    },
    {
      title: "Secure Platform",
      desc: "All transactions and registrations are bounded by cutting-edge security and 2FA OTP tech.",
      icon: "🛡️",
    },
  ];

  return (
    <div className="px-6 py-16 bg-gray-50">
      
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="text-3xl mb-4">{item.icon}</div>

            <h3 className="text-lg font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Features;