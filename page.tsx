import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import onboardImage from "@/public/assets/images/onboard.png";
import onboardImage2 from "@/public/assets/images/onboard2.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUserById(user.id);
  if (userInfo?.onboarded) redirect("/");
 
  const userData = {
    id: userInfo? userInfo.id : user?.id,
    objectId: userInfo?userInfo._id : "",
    username: userInfo ? userInfo.username: "",
    Gender: userInfo ? userInfo.gender : "",
    skills: userInfo? userInfo.skills : "",
    image: userInfo? userInfo.image : user?.imageUrl,
    year: userInfo ? userInfo.year : "",
    instagram: userInfo ? userInfo.instagram : "",
    whatsapp: userInfo ? userInfo.whatsapp : "",
    linkedin: userInfo ? userInfo.linkedin : "",
    github: userInfo ? userInfo.github : "",
    bio: userInfo ? userInfo.bio : "",
    projects: userInfo ? userInfo.projects : "",
    projecttitle: userInfo ? userInfo.projecttitle : "",
    pasthackathontitle: userInfo ? userInfo.pasthackathontitle : "",
  pasthackathondesc: userInfo ? userInfo.pasthackathondesc : "",
  };
  const plainUserData = JSON.parse(JSON.stringify(userData));
  console.log(plainUserData)
  return (
    <main className="flex w-full flex-row items-center justify-center py-10">
      {/* Left image */}
      <div className=" justify-start items-start flex-col gap-10 hidden lg:flex">
        <Image
          src={onboardImage2}
          height={240}
          width={240}
          alt="Onboarding Illustration 2"
        />
      </div>

      {/* Form section */}
      <section className="w-full lg:w-1/2 rounded-xl px-5 bg-white/30 dark:bg-black/30 py-10 backdrop-blur-md">
        <AccountProfile user={plainUserData} btnTitle="Continue" />
      </section>

      {/* Right image */}
      <div className="lg:flex hidden justify-start items-start flex-col gap-10">
        <Image
          src={onboardImage}
          height={240}
          width={240}
          alt="Onboarding Illustration 1"
        />
      </div>
    </main>
  );
}

export default Page;
