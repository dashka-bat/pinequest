import { connectToDatabase } from "@/app/utils/mongoose";
import { EventModel } from "../../../../mongodb/models/event";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();

    const now = new Date();
    const toMonth = now.getMonth();
    const toDate = now.getDate();

    const upComingLimit = 1000;

    try {
        const events = await EventModel.find({ type: 'birthday' }).populate('user');

    const todayBirthdays = [];
    const upComingBirthdays = [];

    for (const event of events) {
      const birthDate = new Date(event.date);
      const user = event.user;

      if (!user || !user.name) continue;

      const thisYearBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      const diffDays = Math.ceil((thisYearBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (
        birthDate.getMonth() === toMonth &&
        birthDate.getDate() === toDate
      ) {
        todayBirthdays.push({
          name: user.name,
          email: user.email,
          type: 'birthday',
        });
      } else if (diffDays > 0 && diffDays <= upComingLimit) {
        upComingBirthdays.push({
          name: user.name,
          daysLeft: diffDays,
        });
      }
    }

    return NextResponse.json(
      {
        today: todayBirthdays,
        upcoming: upComingBirthdays.sort((a, b) => a.daysLeft - b.daysLeft),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching birthdays' }, { status: 500 });
  }
}