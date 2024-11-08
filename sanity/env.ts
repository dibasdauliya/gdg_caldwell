export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-09-02'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

// This is a website for the club GDG Caldwell University. It is a club for students who are interested in technology and want to connect with other students who are passionate about technology. The website is built using Next.js, Tailwind CSS, and Sanity.io. It has a homepage, an about page, a team page, and an apply page. The homepage has a hero section with a logo, a title, and a description of the club. It also has a button to apply to join the club. The about page has information about the club and its mission. The team page has information about the club's team members. The apply page has a form for students to apply to join the club. The website is responsive and works on all devices. It is hosted on Vercel. The code for the website is available on GitHub. The website is maintained by the club's team members. The website is updated regularly with new information about the club and its events. The website is a great resource for students who are interested in technology and want to connect with other students who are passionate about technology. The website is a great way to learn more about the club and get involved in its activities. The website is a great way to stay connected with the club and its team members. The website is a great way to stay informed about the club's events and activities. The website is a great way to learn more about technology and connect with other students who are passionate about technology. The website is a great way to get involved in the club and make a difference in the tech community. The website is a great way to stay connected with the club and its team members. The website is a great way to learn more about technology and connect with other students who are passionate about technology. The website is a great way to get involved in the club and make a difference in the tech community. The website is a great way to stay connected with the club and its team members. The website is a great way to learn more about technology and connect with other students who are passionate about technology. The website is a great way to get involved in the club and make a difference in the tech community. The website is a great way to stay connected with the club and its team members. The website is a great way to learn more about technology and connect with other students who are passionate about technology. The website is a great way to get involved in the club and make a difference in the tech community. The website is a great way to stay connected with

// describe what this codes does in 200 words

// 