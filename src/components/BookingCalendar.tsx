import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format, addWeeks, startOfWeek, addDays, isBefore, startOfDay, isToday } from "date-fns";
import { fr } from "date-fns/locale";

interface BookingCalendarProps {
  contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
  };
  onClose: () => void;
}

const AVAILABLE_SLOTS: Record<number, string[]> = {
  1: ["11:00", "11:30", "12:00", "12:30"], // Lundi
  3: ["12:00", "12:30", "13:00", "13:30"], // Mercredi
  5: ["11:00", "11:30", "12:00", "12:30"], // Vendredi
};

const DAY_LABELS: Record<number, string> = {
  1: "Lundi",
  3: "Mercredi",
  5: "Vendredi",
};

const BookingCalendar = ({ contactData, onClose }: BookingCalendarProps) => {
  const { toast } = useToast();
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const today = startOfDay(new Date());

  const availableDays = useMemo(() => {
    const weekStart = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 });
    const days: { date: Date; dayOfWeek: number; slots: string[] }[] = [];

    for (const [dayOfWeek, slots] of Object.entries(AVAILABLE_SLOTS)) {
      const dow = Number(dayOfWeek);
      const date = addDays(weekStart, dow - 1);
      if (!isBefore(date, today) || isToday(date)) {
        days.push({ date, dayOfWeek: dow, slots });
      }
    }

    return days.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  }, [weekOffset, today]);

  const weekStart = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, 6);
  const weekLabel = `${format(weekStart, "d MMM", { locale: fr })} - ${format(weekEnd, "d MMM yyyy", { locale: fr })}`;

  async function handleConfirm() {
    if (!selectedDate || !selectedTime || loading) return;
    setLoading(true);

    try {
      const r = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
          phone: contactData.phone,
          company: contactData.company,
          date: format(selectedDate, "EEEE d MMMM yyyy", { locale: fr }),
          time: selectedTime,
        }),
      });

      if (r.ok) {
        setConfirmed(true);
        toast({
          title: "Rendez-vous confirmé",
          description: `Votre RDV est fixé le ${format(selectedDate, "EEEE d MMMM", { locale: fr })} à ${selectedTime}.`,
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de confirmer le rendez-vous.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erreur réseau",
        description: "Impossible de contacter le serveur.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (confirmed) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="bg-white max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">Rendez-vous confirmé !</h3>
            <p className="text-muted-foreground">
              Votre rendez-vous est prévu le{" "}
              <strong>{format(selectedDate!, "EEEE d MMMM yyyy", { locale: fr })}</strong> à{" "}
              <strong>{selectedTime}</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              Nous vous enverrons un rappel par email.
            </p>
            <Button onClick={onClose} variant="corporate" className="mt-4">
              Fermer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center border-b">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl text-foreground">Prenez rendez-vous</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Choisissez un créneau pour votre démonstration personnalisée
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Navigation semaines */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
              disabled={weekOffset === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-semibold text-foreground capitalize">{weekLabel}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWeekOffset(weekOffset + 1)}
              disabled={weekOffset >= 4}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Jours disponibles */}
          <div className="grid gap-4">
            {availableDays.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Aucun créneau disponible cette semaine. Essayez la semaine suivante.
              </p>
            )}
            {availableDays.map(({ date, dayOfWeek, slots }) => {
              const isSelectedDay = selectedDate?.getTime() === date.getTime();
              return (
                <div key={date.toISOString()} className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedDate(isSelectedDay ? null : date);
                      setSelectedTime(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      isSelectedDay
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-foreground">{DAY_LABELS[dayOfWeek]}</span>
                        <span className="ml-2 text-muted-foreground">
                          {format(date, "d MMMM", { locale: fr })}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{slots.length} créneaux</span>
                    </div>
                  </button>

                  {isSelectedDay && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-4">
                      {slots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md border text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-border hover:border-primary/50 text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Passer cette étape
            </Button>
            <Button
              variant="corporate"
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime || loading}
              className="flex-1"
            >
              {loading ? "Confirmation..." : "Confirmer le rendez-vous"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCalendar;
