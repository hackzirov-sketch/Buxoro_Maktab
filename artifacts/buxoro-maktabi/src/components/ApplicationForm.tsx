import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, GraduationCap, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  phone: z.string().min(12, "Telefon raqam to'liq emas"),
  location: z.string().min(1, "Manzilni tanlang"),
  grade: z.string().min(1, "Sinfni tanlang")
});

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    phone: "+998",
    location: "",
    grade: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const locations = ["Bekobod shahar", "Shirin shahar", "Juma", "Xos", "Zafar"];
  const grades = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) {
      val = "+998";
    }
    const cleaned = val.replace(/[^\d+]/g, '');
    if (cleaned.length <= 13) {
      setFormData(prev => ({ ...prev, phone: cleaned }));
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      formSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ phone: "+998", location: "", grade: "" });
      }, 3000);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <section className="py-28 md:py-32 relative overflow-hidden" id="ariza">
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-80 h-80 bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto"
        >
          <div className="p-8 md:p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[50px] pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
                Ariza <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">Topshirish</span>
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Farzandingiz kelajagi uchun ilk qadamni tashlang. Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Telefon raqam</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                    <Phone className="w-5 h-5" />
                  </div>
                  <motion.input
                    animate={errors.phone ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full bg-black/40 border ${errors.phone ? "border-red-500/70" : "border-white/10 focus:border-primary/50"} rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                    placeholder="+998 90 123 45 67"
                    data-testid="input-phone"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-sm ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4 shrink-0"/> {errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Manzil</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <motion.select
                    animate={errors.location ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    value={formData.location}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, location: e.target.value }));
                      setErrors(prev => ({ ...prev, location: "" }));
                    }}
                    className={`w-full bg-black/40 border ${errors.location ? "border-red-500/70" : "border-white/10 focus:border-primary/50"} rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer`}
                    data-testid="select-location"
                  >
                    <option value="" disabled className="text-gray-500">Hududni tanlang</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc} className="bg-gray-900 text-white">{loc}</option>
                    ))}
                  </motion.select>
                </div>
                {errors.location && <p className="text-red-400 text-sm ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4 shrink-0"/> {errors.location}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Farzandingiz sinfi</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <motion.select
                    animate={errors.grade ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    value={formData.grade}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, grade: e.target.value }));
                      setErrors(prev => ({ ...prev, grade: "" }));
                    }}
                    className={`w-full bg-black/40 border ${errors.grade ? "border-red-500/70" : "border-white/10 focus:border-primary/50"} rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer`}
                    data-testid="select-grade"
                  >
                    <option value="" disabled className="text-gray-500">Sinfni tanlang</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade} className="bg-gray-900 text-white">{grade}-sinf</option>
                    ))}
                  </motion.select>
                </div>
                {errors.grade && <p className="text-red-400 text-sm ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4 shrink-0"/> {errors.grade}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(74,222,128,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-6 bg-primary text-black font-bold text-base md:text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden focus-visible:outline-2 focus-visible:outline-primary/60"
                data-testid="button-submit-form"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s] ease-out" />
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Yuborish <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 bg-background/90 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center p-8 text-center border border-primary/30"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 18 }}
                    className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Arizangiz qabul qilindi!</h3>
                  <p className="text-white/70 text-sm">Operatorlarimiz tez orada siz bilan bog'lanishadi.</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
