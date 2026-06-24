import {
  ShieldCheck,
  Users,
  Banknote,
  CalendarDays,
  Handshake,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function AboutUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "ආරක්ෂිත සහ විශ්වාසවන්ත",
      desc: "ඔබේ ආයෝජන සහ මුදල් ගනුදෙනු සඳහා උපරිම ආරක්ෂාව සහ විශ්වසනීයත්වය. සියලුම ගනුදෙනු විනිවිදභාවයෙන් යුතුව සිදු කෙරේ.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "ප්‍රජා කේන්ද්‍රීය",
      desc: "සීට්ටු ක්‍රමය හරහා ප්‍රජාව අතර මූල්‍ය සහයෝගීතාවය දිරිමත් කිරීම. එක්ව ඉතිරි කිරීම, එක්ව වර්ධනය වීම.",
    },
    {
      icon: <Banknote className="w-8 h-8 text-blue-600" />,
      title: "සරල මූල්‍ය කළමනාකරණය",
      desc: "සංකීර්ණ නොවූ, ඉතා පහසුවෙන් අනුගමනය කළ හැකි මූල්‍ය සැලසුම්. ඔබගේ ඉතුරුම් ගමන සරල කිරීම.",
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-blue-600" />,
      title: "ක්‍රමවත් කාලසටහන",
      desc: "සියලුම ගෙවීම් සහ දින වකවානු විනිවිදභාවයකින් යුතුව කළමනාකරණය කිරීම. කිසිදු ගෙවීමක් මග හැරෙන්නේ නැත.",
    },
  ];

  const stats = [
    { number: "50+", label: "සාමාජිකයින්" },
    { number: "10+", label: "ක්‍රියාකාරී සීට්ටු" },
    { number: "LKR 5M+", label: "මුළු ඉතුරුම්" },
    { number: "100%", label: "තෘප්තිමත් ගනුදෙනු" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white px-8 py-6 rounded-3xl shadow-lg border border-gray-100">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              සීට්ටු ලංකා ගැන
            </h1>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              "සීට්ටු ලංකා" යනු ශ්‍රී ලාංකීය පවුල් සහ ව්‍යාපාරික ප්‍රජාවන්
              එකිනෙකාට උදව් කරගනිමින්, සාම්ප්‍රදායික සීට්ටු ක්‍රමය නූතන තාක්ෂණය
              සමඟින් වඩාත් කාර්යක්ෂමව පවත්වාගෙන යාම සඳහා නිර්මාණය කරන ලද ඩිජිටල්
              වේදිකාවකි.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">අපගේ දැක්ම</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              විශාල බැංකු ණය පොලී බරින් තොරව, අන්‍යෝන්‍ය අවබෝධය මත පදනම් වූ
              ඉතුරුම් සංස්කෘතියක් නැවත ස්ථාපිත කිරීම. සියලුම ශ්‍රී ලාංකිකයන්ට
              ආරක්ෂිත, විනිවිද පෙනෙන සහ පහසු මූල්‍ය විසඳුමක් ලබා දීම අපගේ
              අරමුණයි.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">අපගේ මෙහෙවර</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              ඩිජිටල්කරණය වූ ලෝකයක ඔබගේ මූල්‍ය කටයුතු වඩාත් ක්‍රමවත්ව කිරීමට අපි
              ඔබට සහාය වෙමු. විනිවිදභාවය, පාලනය සහ පහසුව අපගේ සේවාවේ පදනමයි. ඔබට
              දත්ත පරීක්ෂා කර බැලීමට සහ ඔබගේ ඉතුරුම් ගමන නිරීක්ෂණය කිරීමට හැකි
              ආරක්ෂිත වේදිකාවකි මෙය.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100"
            >
              <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              අපව වෙනස් කරන්නේ කුමක් ද?
            </h2>
            <p className="text-gray-500">සීට්ටු ලංකා තෝරා ගැනීමේ ප්‍රතිලාභ</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow hover:-translate-y-1 duration-300"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-xl inline-block">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              සීට්ටු ලංකා ක්‍රියා කරන ආකාරය
            </h2>
            <p className="text-gray-500">සරල පියවර 3ක්</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ලියාපදිංචි වන්න
              </h3>
              <p className="text-gray-500 text-sm">
                ඔබගේ විස්තර සමඟ සාමාජිකයෙකු ලෙස ලියාපදිංචි වන්න
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                සීට්ටුවට සම්බන්ධ වන්න
              </h3>
              <p className="text-gray-500 text-sm">
                පවතින සීට්ටුවකට සම්බන්ධ වන්න හෝ අලුතක් ආරම්භ කරන්න
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ඉතිරි කර වර්ධනය වන්න
              </h3>
              <p className="text-gray-500 text-sm">
                කාලසටහනට අනුව ගෙවීම් කර ඔබේ ඉතුරුම් වර්ධනය කරගන්න
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">
              සීට්ටු ලංකා තෝරා ගන්නේ ඇයි?
            </h2>
            <p className="text-blue-100">අප ඔබට ලබා දෙන විශේෂ ප්‍රතිලාභ</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/30 rounded-full mb-4">
                <Handshake className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">විශ්වාසය</h3>
              <p className="text-blue-100 text-sm">
                විනිවිද පෙනෙන සහ විශ්වාසනීය ගනුදෙනු
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/30 rounded-full mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">වර්ධනය</h3>
              <p className="text-blue-100 text-sm">
                ක්‍රමානුකූල ඉතුරුම් සහ ආයෝජන
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-500/30 rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ප්‍රජාව</h3>
              <p className="text-blue-100 text-sm">එකිනෙකාට සහය වන ප්‍රජාවක්</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <div className="inline-block bg-white px-8 py-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-gray-600 italic text-lg">
              "සීට්ටු ලංකා - හෙට දවසේ මූල්‍ය ස්ථාවරත්වය සඳහා සාම්ප්‍රදායික
              විසඳුම."
            </p>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-400 text-sm mt-2">
              © 2026 සීට්ටු ලංකා. සියලුම හිමිකම් ඇවිරිණි.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
