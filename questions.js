// Paste your full 100-question array here.
// Important: the variable name must be QUESTIONS, not questions.

const QUESTIONS = [
    {
        question: "Which component in a UAS is responsible for providing thrust?",
        options: ["Flight Controller", "Receiver", "Propulsion System", "GNSS"],
        answer: 2,
        explanation: "The propulsion system creates thrust for movement."
    },
    {
        question: "What is a defining characteristic of a multirotor drone?",
        options: ["Uses lighter-than-air gas", "Has a single fixed wing", "Has multiple lift-generating rotors", "Can only fly in one direction"],
        answer: 2,
        explanation: "A multirotor uses several rotors to generate lift."
    },
    {
        question: "What type of aircraft is an airship?",
        options: ["Fixed-wing", "Powered-lift", "Rotorcraft", "Lighter-than-air"],
        answer: 3,
        explanation: "Airships use buoyant gas, so they are lighter-than-air aircraft."
    },
    {
        question: "Which force acts upward and counters the weight of the aircraft?",
        options: ["Thrust", "Drag", "Lift", "Inertia"],
        answer: 2,
        explanation: "Lift acts upward against weight."
    },
    {
        question: "What causes an aerodynamic stall?",
        options: ["Too low airspeed", "Too much thrust", "Critical angle of attack exceeded", "Damaged propeller"],
        answer: 2,
        explanation: "A stall happens when the critical angle of attack is exceeded."
    },
    {
        question: "Which axis of motion is controlled by ailerons?",
        options: ["Yaw", "Pitch", "Roll", "Drag"],
        answer: 2,
        explanation: "Ailerons control roll."
    },
    {
        question: "Which authority regulates unmanned aircraft operations in Singapore?",
        options: ["LTA", "CAAS", "MOT", "PUB"],
        answer: 1,
        explanation: "CAAS regulates unmanned aircraft operations in Singapore."
    },
    {
        question: "What is the penalty for unauthorized photography over protected areas?",
        options: ["Warning only", "Fine or jail time", "License suspension", "No penalty"],
        answer: 1,
        explanation: "Unauthorized activity may result in fines or imprisonment."
    },
    {
        question: "What is prohibited from being carried by unmanned aircraft?",
        options: ["Water", "Hazardous materials", "Cameras", "Batteries"],
        answer: 1,
        explanation: "Hazardous materials are not allowed to be carried."
    },
    {
        question: "What does GPS use to determine position?",
        options: ["Barometric pressure", "Laser scanning", "Satellite timing", "Radar triangulation"],
        answer: 2,
        explanation: "GPS uses satellite timing signals to calculate position."
    },
    {
        question: "Which atmospheric condition causes signal delay in the troposphere?",
        options: ["Humidity", "Temperature", "Refractive index", "Wind speed"],
        answer: 2,
        explanation: "Tropospheric refraction can delay signals."
    },
    {
        question: "Which cloud type is most associated with thunderstorms?",
        options: ["Cumulus", "Stratus", "Cumulonimbus", "Cirrus"],
        answer: 2,
        explanation: "Cumulonimbus clouds are linked to thunderstorms."
    },
    {
        question: "What does the 'L' represent in the SHELL model?",
        options: ["Latitude", "Lift", "Liveware", "Legislation"],
        answer: 2,
        explanation: "Liveware refers to the human element."
    },
    {
        question: "Which visual illusion causes a stationary light to appear as if it is moving?",
        options: ["Motion blur", "Tunnel vision", "Autokinesis", "VOR illusion"],
        answer: 2,
        explanation: "Autokinesis makes a fixed light appear to move."
    },
    {
        question: "Which factor is most important for good Liveware-Hardware interface?",
        options: ["Weight of equipment", "User comfort and clarity", "Color of display", "Size of manual"],
        answer: 1,
        explanation: "Good interfaces should be clear and comfortable to use."
    },
    {
        question: "What is the typical process flow for risk management?",
        options: ["Assessing risks, determining mitigation actions, and identifying hazards", "Identifying hazards, determining mitigation actions, and assessing risks", "Identifying hazards, assessing risks, and determining mitigation actions", "Assessing risks, identifying hazards, and determining mitigation actions"],
        answer: 2,
        explanation: "Risk management starts with hazards, then risk assessment, then mitigation."
    },
    {
        question: "What does an Unmanned Aircraft System (UAS) typically comprise?",
        options: ["Unmanned Aircraft, Command and Control C2 Link, Ground Control Station", "Electrical System, Propulsion System, Flight Control System, Ground Control System, Command & Control System", "Unmanned Aircraft (UA), Command and Control (C2) System, Electrical System, Flight Control System", "Electrical System, Propulsion System, Flight Control System"],
        answer: 0,
        explanation: "A UAS includes the aircraft, C2 link, and ground control station."
    },
    {
        question: "You want to fly a 1kg FPV below 200 ft AMSL, outside of 5km from the aerodrome and not within a protected area. What approvals do you need?",
        options: ["Class 1 Activity Permit", "Class 2 Activity Permit", "Class 1 Activity Permit and Operator Permit", "None - fly according to CAAS safe flying guidelines with the assistance of an observer"],
        answer: 3,
        explanation: "No permit is needed if operating within the stated safe conditions."
    },
    {
        question: "How do you change the spinning direction of a motor?",
        options: ["Change all three connections of the motor cables to the ESC", "Swap the ESC signal ground wire and ESC Signal Wire", "Swap only the right and the left connections of the motor cables to the ESC", "Swap any two cables from the ESC to the motor"],
        answer: 3,
        explanation: "Swapping any two motor wires reverses motor direction."
    },
    {
        question: "What is the minimum age to register an unmanned aircraft?",
        options: ["18", "16", "20", "22"],
        answer: 1,
        explanation: "The minimum registration age is 16."
    },
    {
        question: "You have just de-registered a UA that had crashed and are trying to buy a registration label for a replacement UA. The system does not allow you to do so. What do you do?",
        options: ["There is something wrong with the de-registration, wait and try again", "The portal has a bug, report it to CAAS for assistance", "You have exceeded the number of aircraft registrations that you have, contact CAAS to extend your purchasing limit", "The registration label is out of stock, wait for restocking"],
        answer: 2,
        explanation: "You may need CAAS to extend your registration label limit."
    },
    {
        question: "What is the authoritative source to check temporary airspace restrictions and the official source of no-fly zones?",
        options: ["Onemap", "Google Map", "SGmap", "Flywhere"],
        answer: 0,
        explanation: "OneMap is the official source for such checks."
    },
    {
        question: "You are on approach to an airfield with a constant speed and descent rate. You notice that your speed is slowly decreasing. The AOA is 5 degrees and the critical AOA is 15 degrees. What should you do?",
        options: ["Do nothing, it is normal for the speed to decrease", "Take stall prevention actions, you are about to stall", "Increase throttle and adjust pitch as required", "Increase AOA to compensate for the reduced speed"],
        answer: 2,
        explanation: "Add power and adjust pitch to maintain a safe approach."
    },
    {
        question: "Which of the following is false about clouds?",
        options: ["There is turbulence under a cumulus cloud, whereas a cumulonimbus cloud will have lightning and turbulence", "There is no turbulence under a cumulus cloud, whereas a cumulonimbus cloud will have lightning and turbulence", "Cumulonimbus clouds are patchy grey or white clouds that often have a dark honeycomb-like appearance", "Cumulonimbus clouds can reach up to the thermosphere"],
        answer: 1,
        explanation: "Cumulus clouds can still be associated with turbulence."
    },
    {
        question: "What is the advantage of an aeroplane over a multirotor?",
        options: ["Weight, Aeroplane is lighter than multirotor", "Range, Aeroplanes can fly further because of better transmission range as compared to multirotors", "Range, Aeroplane can fly further because of better power efficiency flight as compared to Multirotor", "Range, Aeroplanes can fly further because of better transmission range and power efficiency flight as compared to multirotors"],
        answer: 2,
        explanation: "Aeroplanes are generally more power efficient in forward flight."
    },
    {
        question: "Which aircraft category is the best for persistent surveillance over a small area without using a powered tether system?",
        options: ["Helicopter", "Multirotor", "Airship", "Powered lift/Vertical Take Off and Landing (VTOL)"],
        answer: 2,
        explanation: "Airships can remain airborne for long periods efficiently."
    },
    {
        question: "What is the penalty for flying in a restricted/protected area without prior approval?",
        options: ["Up to $10,000 or imprisonment for a term not exceeding 2 years", "Up to $20,000 or imprisonment for a term not exceeding 2 years", "Up to $50,000 or imprisonment for a term not exceeding 1 year", "Up to $50,000 or imprisonment for a term not exceeding 2 years"],
        answer: 3,
        explanation: "The stated penalty is up to $50,000 or 2 years imprisonment."
    },
    {
        question: "What does a LIDAR use to measure distance?",
        options: ["Length of the light beam", "Light Energy and Time", "Length of the reflected light", "Light waves"],
        answer: 1,
        explanation: "LIDAR measures distance using light and timing."
    },
    {
        question: "What component interaction of the SHELL model does a Pilot using Flight Manuals, Reference Checklists, and Procedures demonstrate?",
        options: ["Liveware-Liveware", "Software-Liveware", "Hardware-Liveware", "Environment-Liveware"],
        answer: 1,
        explanation: "Manuals and procedures are software interacting with the pilot."
    },
    {
        question: "In what phase should a UA pilot plan the alternate and emergency landing areas?",
        options: ["Pre-flight", "Mid-Flight", "Flight Planning", "Contingency/Emergency planning"],
        answer: 2,
        explanation: "Alternate landing areas should be planned during flight planning."
    },
    {
        question: "What is the most effective way to manage stress?",
        options: ["Take deep and controlled breathing", "Identify your source of stressors and manage it", "Take a short break", "Inform others and work out a solution"],
        answer: 1,
        explanation: "Managing the source of stress is most effective."
    },
    {
        question: "What is an effective model to use to manage risks during the pre-flight phase?",
        options: ["DECIDE", "3Ps", "PAVE", "SHELL"],
        answer: 2,
        explanation: "PAVE helps assess pre-flight risks."
    },
    {
        question: "Under the ANR-101, what is the definition of a rotorcraft?",
        options: ["UA that can generate lift using rotating aerofoils", "Power-driven heavier-than-air aircraft supported by one or more rotors", "Power-driven heavier-than-air aircraft supported by two or more rotors", "Power-driven heavier-than-air aircraft supported by three or more rotors"],
        answer: 1,
        explanation: "Rotorcraft are power-driven aircraft supported by rotors."
    },
    {
        question: "Your UA is unresponsive to controls. What error situation is this?",
        options: ["Loss of GNSS", "Loss of power", "Loss of C2 link", "Wind limit exceeded"],
        answer: 2,
        explanation: "Unresponsive controls suggest loss of command and control link."
    },
    {
        question: "The point at which lift acts on the wing is called:",
        options: ["Centre of lift", "Centre of gravity", "Centre of Pressure", "Moment of mass"],
        answer: 2,
        explanation: "Lift is considered to act through the centre of pressure."
    },
    {
        question: "What type of discharge from a UA is allowed?",
        options: ["Water", "Exhaust from the UA engine", "Heat", "None above"],
        answer: 1,
        explanation: "Engine exhaust is an allowed operational discharge."
    },
    {
        question: "What is the consequence of the ground effect?",
        options: ["Reduce Lift", "Reduce Parasite drag", "Reduce induced drag", "Reduced pressure under the wings"],
        answer: 2,
        explanation: "Ground effect reduces induced drag near the surface."
    },
    {
        question: "Which of the following least contributes to fatigue?",
        options: ["Lack of Sleep", "Inadequate rest", "Avoiding caffeine in the diet", "Intensive exercise"],
        answer: 2,
        explanation: "Avoiding caffeine does not usually contribute to fatigue."
    },
    {
        question: "Which is the least negative effect of stress?",
        options: ["An increase in adrenaline leading to a decrease in reaction time", "Increase time taken to make decision", "Increase multi-tasking capability", "Increase responsibility"],
        answer: 0,
        explanation: "Adrenaline may briefly improve reaction time."
    },
    {
        question: "If the plane keeps pitching upwards, which trim does the pilot need to prevent it?",
        options: ["Trim ailerons upwards", "Trim ailerons downwards", "Trim elevator downwards", "Trim elevator upwards"],
        answer: 2,
        explanation: "Down elevator trim helps counter a nose-up tendency."
    },
    {
        question: "Which components are responsible for aeroplane flight manoeuvres?",
        options: ["Elevator - roll, rudder - yaw, ailerons - pitch", "Elevator - pitch, rudder - roll, ailerons - yaw", "Elevator - yaw, rudder - pitch, ailerons - roll", "Elevator - pitch, rudder - yaw, ailerons - roll"],
        answer: 3,
        explanation: "Elevator controls pitch, rudder controls yaw, ailerons control roll."
    },
    {
        question: "What is the penalty for a first offence of flying in a prohibited place?",
        options: ["Up to $10,000 or imprisonment for a term not exceeding 2 years", "Up to $20,000 or imprisonment for a term not exceeding 2 years", "Up to $50,000 or imprisonment for a term not exceeding 1 year", "Up to $50,000 or imprisonment for a term not exceeding 2 years"],
        answer: 3,
        explanation: "The stated first offence penalty is up to $50,000 or 2 years."
    },
    {
        question: "What is the relationship between altitude and pressure?",
        options: ["As altitude increases, pressure decreases", "As altitude increases, pressure increases", "As altitude decreases, pressure decreases", "As altitude decreases, pressure is unchanged"],
        answer: 0,
        explanation: "Air pressure decreases as altitude increases."
    },
    {
        question: "Which are the 4 forces of flight?",
        options: ["Lift, drag, mass, throttle", "Lift, drag, mass, thrust", "Lift, drag, weight, thrust", "Lift, drag, weight, throttle"],
        answer: 2,
        explanation: "The four forces are lift, drag, weight, and thrust."
    },
    {
        question: "Which type of medication can the pilot take before the flight?",
        options: ["Prescribed medication by the doctor", "Non-prescribed medication by the doctor", "Any non-prescribed medication", "Non-prescribed medication that has been taken before without side effects"],
        answer: 3,
        explanation: "Medication should be known to have no adverse side effects."
    },
    {
        question: "What do you need when you are flying a 10kg drone for recreation outside any restricted zones?",
        options: ["Register UA and get Class B UAPL for multirotor up to 25kg", "Register UA and get Class B UAPL for rotorcraft up to 10kg", "Register UA and get Class A UAPL for rotorcraft up to 15kg", "Register UA and get Class A UAPL for multirotor up to 25kg"],
        answer: 3,
        explanation: "A 10kg recreational multirotor requires registration and Class A UAPL."
    },
    {
        question: "What do you need when you are flying a 15kg drone for building facade inspection in a prohibited area?",
        options: ["Register UA, obtain a class A UAPL for multirotor up to 25kg, Operator Permit, Class 2 Activity Permit", "Register UA, obtain a class A UAPL for multirotor up to 25kg, Operator Permit, Class 1 Activity Permit", "Register UA, obtain a class A UAPL for multirotor up to 25kg, Operator Permit, Class 1 Activity permit, subscribed to centralised Flight Management System, and attached a tracking device", "There is nothing you can do to fly"],
        answer: 3,
        explanation: "The provided answer key says this operation cannot be conducted."
    },
    {
        question: "What model for ADM offers a simple, practical, and systematic approach?",
        options: ["3P model", "DECIDE model", "PAVE model", "IMSAFE model"],
        answer: 0,
        explanation: "The 3P model is a simple ADM process."
    },
    {
        question: "What framework check is used before the flight?",
        options: ["3Ps", "ADM", "PAVE", "DECIDE"],
        answer: 2,
        explanation: "PAVE is commonly used for pre-flight risk checking."
    },
    {
        question: "Which of the following is true about latitude?",
        options: ["Latitude to the south is positive", "Gets shorter towards the poles, so it cannot be used for measurement", "Latitude is an angle from the prime meridian", "Latitude to the north is negative"],
        answer: 1,
        explanation: "This follows the answer key you provided."
    },
    {
        question: "What axis is not typically used in UA?",
        options: ["Longitudinal", "Lateral", "Vertical", "Horizontal"],
        answer: 3,
        explanation: "UA motion typically uses longitudinal, lateral, and vertical axes."
    },
    {
        question: "With regards to photography in a restricted area, it is not illegal if...",
        options: ["When the photographs are kept for personal collection", "Drone does not have a camera", "When the photographs are taken by a UAPL licensed pilot", "When the Photographs are blurred and pixelated"],
        answer: 1,
        explanation: "No camera means no photography can be taken."
    },
    {
        question: "What is used to describe when pilots lose control of UA?",
        options: ["Loss of Control link", "Loss of GNSS", "Loss of Power", "Stall"],
        answer: 0,
        explanation: "Loss of control link describes loss of pilot control input."
    },
    {
        question: "What UA is suitable for long-term surveillance without a power tethered system?",
        options: ["Airship", "Powered-lift", "Multirotor", "Aeroplane"],
        answer: 0,
        explanation: "Airships are efficient for long-duration surveillance."
    },
    {
        question: "What can be used to measure the wind on-site?",
        options: ["Anemometer", "Pitot tube", "Gyroscope", "Accelerometer"],
        answer: 0,
        explanation: "An anemometer measures wind speed."
    },
    {
        question: "What can be used to measure vibration on UA?",
        options: ["Anemometer", "Pitot tube", "Gyroscope", "Accelerometer"],
        answer: 3,
        explanation: "Accelerometers can detect vibration and acceleration."
    },
    {
        question: "What is the official source to check no-fly zones?",
        options: ["Onemap.com", "Onemap.com.sg", "Onemap.gov.sg", "Onemap.sg"],
        answer: 2,
        explanation: "OneMap.gov.sg is the official source."
    },
    {
        question: "How many stages are there in a spin?",
        options: ["Three: Entry, Fully Developed, Recovery", "Four: Entry, Fully developed, helical, Exit", "Five: Entry, Fully developed, Helical, Recovery, Exit", "Three: Entry, Fully Developed, Helical"],
        answer: 0,
        explanation: "A spin has entry, fully developed, and recovery stages."
    },
    {
        question: "Which best describes a case where the UA is not responding to inputs from the pilot?",
        options: ["Telemetry Link Loss", "Control Link Loss", "GNSS Link Loss", "GPS Link Loss"],
        answer: 1,
        explanation: "No response to pilot inputs indicates control link loss."
    },
    {
        question: "How long is the validity of the UABTC?",
        options: ["2 Years", "3 Years", "4 Years", "No Expiry"],
        answer: 3,
        explanation: "UABTC has no expiry based on your answer key."
    },
    {
        question: "You finished your theory test on 1 Sep 2023, and passed the practical assessment on 1 Oct 2023. When is the latest date you can apply for the UAPL?",
        options: ["31 Aug 2025", "31 Sep 2025", "31 Aug 2027", "31 Sep 2027"],
        answer: 0,
        explanation: "The latest application date is based on the theory test validity."
    },
    {
        question: "What does the A in IMSAFE stand for?",
        options: ["Attitude", "Altitude", "Aircraft", "Alcohol"],
        answer: 3,
        explanation: "A stands for Alcohol."
    },
    {
        question: "Methods to prevent visual trickery?",
        options: ["Use Peripheral Vision", "Just focus on one spot", "Shift your gaze often", "Rub your eye"],
        answer: 2,
        explanation: "Shifting gaze helps prevent visual illusions."
    },
    {
        question: "Your son, who is 12 years old, wants to fly an FPV drone that exceeds 250g. What can a parent do?",
        options: ["Nothing, he is too young", "Nothing, the son can fly the FPV drone without permission", "Register UA, obtain UABTC, and the parent needs to accompany the son at all times", "Obtain UABTC, and the parent needs to accompany the son at all times"],
        answer: 2,
        explanation: "The UA must be registered and the parent must accompany the child."
    },
    {
        question: "Flying in a protected area is not illegal if:",
        options: ["Pilot is not aware it is a protected area", "Pilot is livestreaming only", "UA does not have the capability to take videos or photos", "UA has a camera, but the pilot did not take a photo"],
        answer: 2,
        explanation: "The provided key says it is not illegal if no photo/video capability exists."
    },
    {
        question: "Universal Transverse Mercator (UTM) is divided to?",
        options: ["6 Zones, each 60 degrees in longitude", "6 Zones, each 60 degrees in latitude", "60 Zones, each 6 degrees in longitude", "60 Zones, each 6 degrees in latitude"],
        answer: 2,
        explanation: "UTM uses 60 zones, each 6 degrees of longitude."
    },
    {
        question: "What is the antidote for Impulsivity?",
        options: ["Slow down, think first", "Taking Chances is foolish", "Anything could happen to you", "Follow the rules, they are usually right"],
        answer: 0,
        explanation: "The antidote is to slow down and think first."
    },
    {
        question: "What are the four categories of UA mentioned in Air Navigation Regulations in Singapore?",
        options: ["Fixed wing, Power-lift, Airship, Rotorcraft", "Aeroplane, Multicopter, Helicopter, Powered-lift", "Aeroplane, Helicopter, Powered-lift, Airship", "Airship, Powered-lift, Rotorcraft, Aeroplane"],
        answer: 3,
        explanation: "The categories are airship, powered-lift, rotorcraft, and aeroplane."
    },
    {
        question: "What do you call the measurement from the drone level to the sea level?",
        options: ["Height above mean sea level", "Attitude above mean sea level", "Altitude above mean sea level", "Length above mean sea level"],
        answer: 2,
        explanation: "Altitude is measured above mean sea level."
    },
    {
        question: "What are the benefits of an aeroplane over a multirotor?",
        options: ["Endurance", "Hovering precision", "Take off footprint", "Transmission range"],
        answer: 0,
        explanation: "Aeroplanes usually have better endurance."
    },
    {
        question: "What to do when you experience spatial disorientation?",
        options: ["Move the control slowly and monitor drone's motion", "Read and check your flight telemetry on the screen", "Turn your body and face the same direction of the UA"],
        answer: 1,
        explanation: "Telemetry provides reliable flight information."
    },
    {
        question: "Which of the following stresses is the most difficult to recover from?",
        options: ["Acute", "Chronic", "Environmental", "Physiological"],
        answer: 1,
        explanation: "Chronic stress lasts longer and is harder to recover from."
    },
    {
        question: "When the aileron flaps on the left wing moves up and the aileron flaps on the right wing moves down, how will the aeroplane move?",
        options: ["Roll Left", "Roll Right", "Yaw Left", "Yaw Right"],
        answer: 0,
        explanation: "Left aileron up and right aileron down causes a left roll."
    },
    {
        question: "Which axis does pitch control?",
        options: ["Lateral", "Longitudinal", "Vertical", "Horizontal"],
        answer: 0,
        explanation: "Pitch occurs around the lateral axis."
    },
    {
        question: "An aeroplane is flying, and the CG suddenly moves aft. What will happen to the aeroplane?",
        options: ["It will become neutral static stability", "It will become neutral dynamic stability", "It will pitch up", "It will pitch down"],
        answer: 2,
        explanation: "An aft CG can cause a nose-up tendency."
    },
    {
        question: "An aeroplane is flying, and the pilot pitches the aeroplane upwards. What will happen to the centre of pressure?",
        options: ["It will increase", "It will decrease", "It will increase and move fore", "It will increase and move aft"],
        answer: 2,
        explanation: "Higher angle of attack increases lift and can move pressure forward."
    },
    {
        question: "What is the safest charging rate for a lipo battery rated at 1550mAh, 4S, 14.8V, 22.94Wh and 25C?",
        options: ["1C", "25C", "100C", "50C"],
        answer: 0,
        explanation: "1C is the safest standard charging rate."
    },
    {
        question: "What is Angle of Attack (AOA)?",
        options: ["Angle between the airflow and the chord line", "Angle between the chamber and the airflow", "Angle of Ascend", "Air Organisation Authority"],
        answer: 0,
        explanation: "AOA is the angle between airflow and chord line."
    },
    {
        question: "What do you need when you are flying a 9kg drone for Educational purposes in the school field, located 4.5km away from an airport?",
        options: ["Register UA, obtain a class A UAPL for multirotor up to 25kg, Class 2 Activity Permit", "Register UA, obtain a class A UAPL for multirotor up to 25kg, Operator Permit, Class 1 Activity Permit", "Register UA, obtain a class A UAPL for multirotor up to 25kg, Operator Permit, Class 2 Activity permit", "Register UA, obtain a class A UAPL for multirotor up to 25kg, Operator Permit, Class 1 Activity Permit and subscribed to centralised Flight Management System, attached a tracking device"],
        answer: 3,
        explanation: "Near an airport requires the stricter permit and tracking requirements."
    },
    {
        question: "How do airships work?",
        options: ["Use gases lighter than air", "Use electric", "Use diesel", "Use wind"],
        answer: 0,
        explanation: "Airships use lighter-than-air gas for lift."
    },
    {
        question: "The engineer designed a remote control for the drone and added an emergency stop button for easy access. What interaction components from the SHELL concept is this?",
        options: ["Liveware-liveware", "Liveware-hardware", "Liveware-software", "Liveware-environment"],
        answer: 1,
        explanation: "This is interaction between user and physical hardware."
    },
    {
        question: "What is the penalty of Dangerous flying?",
        options: ["Fine not exceeding $100,000, or imprisonment for a term not exceeding 5 years or both", "Fine not exceeding $100,000, or imprisonment for a term not exceeding 10 years or both", "Fine not exceeding $50,000, or imprisonment for a term not exceeding 5 years or both", "Fine not exceeding $100,000, or imprisonment for a term not exceeding 5 years"],
        answer: 0,
        explanation: "Dangerous flying can result in a large fine, imprisonment, or both."
    },
    {
        question: "When the UA took off from an elevation of 15m and ascended at a rate of 2m/s. What will be the altitude reading after 5s?",
        options: ["25m", "20m", "15m", "2m"],
        answer: 0,
        explanation: "15m plus 10m climb equals 25m."
    },
    {
        question: "Which is true about the Activity Permit (AP)?",
        options: ["Able to amend the date after the date stated in AP", "Able to amend UA after the date stated in AP", "Able to amend the date before the date stated in AP", "Able to amend UA after the date stated in AP"],
        answer: 2,
        explanation: "AP dates can be amended before the approved date."
    },
    {
        question: "When do you need to replace the propeller?",
        options: ["When it is dirty", "When it is discoloured", "When it has been used for 100 flight hours", "When it is not secured to the motor"],
        answer: 1,
        explanation: "Discolouration can indicate propeller degradation."
    },
    {
        question: "What to do when the battery gets hot after the flight?",
        options: ["Quickly dispose battery as it is dangerous", "Put the battery onto the charger and start charging for maximum efficiency", "Wait for the battery to cool while it is in the UA", "Remove the battery from UA for it to cool down"],
        answer: 3,
        explanation: "Remove it and let it cool safely before charging."
    },
    {
        question: "If the UA takes off on a surface with an elevation of 15m, it is ascending at a rate of 2m/s. What will be the altitude after 10s?",
        options: ["35m", "20m", "10m", "15m"],
        answer: 2,
        explanation: "This follows the answer key you provided."
    },
    {
        question: "Which is true about Longitude and Latitude measurements?",
        options: ["Latitude measures up to 180 degrees while Longitude measures up to 360 degrees", "Latitude measures up to 90 degrees while Longitude measures up to 360 degrees", "Latitude measures up to 180 degrees while Longitude measures up to 180 degrees", "Latitude measures up to 90 degrees while Longitude measures up to 180 degrees"],
        answer: 3,
        explanation: "Latitude goes to 90 degrees, longitude to 180 degrees."
    },
    {
        question: "What is the main purpose of trim?",
        options: ["To counter external forces", "To reduce pilot workload", "To balance the UA in flight", "To ensure effective control of the UA"],
        answer: 1,
        explanation: "Trim reduces the pilot's control workload."
    },
    {
        question: "Which is true about an ultrasonic sensor and a vision sensor comparison?",
        options: ["Ultrasonic sensors have better accuracy under good lighting as compared to vision sensors", "Ultrasonic sensors are unaffected by fog and poor lighting, while vision sensors are affected", "Vision sensors have a longer effective measuring range than Ultrasonic sensors", "All of the above"],
        answer: 1,
        explanation: "Vision sensors are more affected by lighting and visibility."
    },
    {
        question: "Which operation is the best for a rotorcraft?",
        options: ["Wide area mapping", "Building inspection", "Long-range surveillance", "Long-distance delivery"],
        answer: 1,
        explanation: "Rotorcraft are well suited for close inspection work."
    },
    {
        question: "Which is not considered a hazard when flying a UA operation?",
        options: ["Forecast of approaching fog", "Trees and poles within the operational zone", "Temporary structures around the operational zone", "Tall buildings out of the operational zone"],
        answer: 3,
        explanation: "Hazards outside the operational zone are less directly relevant."
    },
    {
        question: "What are the names of the 4 forces?",
        options: ["Lift, Gravity, Drag, Propulsion", "Lift, Gravity, Drag, Thrust", "Lift, Weight, Drag, Thrust", "Lift, Weight, Drag, Propulsion"],
        answer: 3,
        explanation: "This follows the answer key you provided."
    },
    {
        question: "The registration of unmanned aircraft (UA) is mandatory for any UA with a total weight above what?",
        options: ["250 g", "1.5 kg", "7 kg", "25 kg"],
        answer: 0,
        explanation: "UA registration is mandatory above 250 g."
    },
    {
        question: "Which of the following is correct about UA Registration?",
        options: ["Any UA with a total weight of above 250 g must be registered", "Registrants must be 16 years old and above at the point of registration", "UA must be registered prior to operation", "All of the above"],
        answer: 3,
        explanation: "All listed registration statements are correct."
    },
    {
        question: "What are the Class 2 Activity Permit (AP2) conditions?",
        options: ["Exceeding 20ft AMSL, within 5km of a civil aerodrome or military airbase, or within any restricted, danger, or protected area", "Exceeding 200ft AMSL, within 5km of a civil aerodrome or military airbase, or within any restricted, danger, or protected area", "Exceeding 200ft AMSL, within 5km of a civil aerodrome or military airbase, or within any restricted or danger area", "Not exceeding 200ft AMSL, within 5km of a civil aerodrome or military airbase, or within any restricted, danger, or protected area"],
        answer: 2,
        explanation: "AP2 applies for higher altitude, aerodrome proximity, restricted, or danger areas."
    },
    {
        question: "Which of the following requires both an Operator Permit and Class 1 Activity Permit in Singapore?",
        options: ["Operating a 10 kg unmanned aircraft for educational purposes", "Operating a 6 kg unmanned aircraft for recreational purposes above 200 feet AMSL", "Operating a 2 kg unmanned aircraft for recreation purpose within 5 km of any aerodrome", "Operating a 20 kg unmanned aircraft indoors for experimental testing within private facility"],
        answer: 0,
        explanation: "Educational use is non-recreational and may require OP and Class 1 AP."
    },
    {
        question: "Where on the UA should you stick your registration label?",
        options: ["Main body", "Landing Gear", "Battery", "Remote Control"],
        answer: 0,
        explanation: "The registration label should be fixed on the UA main body."
    },
    {
        question: "Which statement correctly describes the requirement for Broadcast Remote Identification (B-RID) in Singapore?",
        options: ["All unmanned aircraft must be equipped with B-RID regardless of weight and operating conditions", "B-RID is only required for unmanned aircraft used for recreational purposes", "Unmanned aircraft weighing more than 250g must be equipped with B-RID when operating outdoors, unless operating under an Operator Permit using the FlyItSafe mobile application", "B-RID only transmits the unmanned aircraft serial number and does not include operator information"],
        answer: 2,
        explanation: "B-RID generally applies outdoors above 250 g unless covered by the stated OP/FlyItSafe condition."
    },
    {
        question: "It is an offence to operate an unregistered UA that weighs more than 250 g in Singapore. Offenders could face what penalty?",
        options: ["A fine of up to $10,000 and/or imprisonment not exceeding 10 months", "A fine of up to $6,000 and/or imprisonment not exceeding 6 months", "A fine of up to $10,000 and/or imprisonment not exceeding 6 months", "A fine of up to $6,000 and/or imprisonment not exceeding 10 months"],
        answer: 2,
        explanation: "The penalty can be up to $10,000 and/or 6 months imprisonment."
    }
];
