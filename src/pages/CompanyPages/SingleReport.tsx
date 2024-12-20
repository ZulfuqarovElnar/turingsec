import { useParams } from 'react-router-dom';
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Line from "../../components/shared/WorkerShared/Line";
import RadioInput from "../../components/component/RadioInput";
import { useState, useEffect, useRef } from "react";
import { Textarea } from '../../components/ui/textarea';
import { useGetReportById } from '../../queryies/useGetReportById';
import { useGetAllReportsCompanysById } from '../../queryies/useGetAllReporsCompanysById';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { CompatClient } from '@stomp/stompjs';
import { Button } from '../../components/ui/button';
import { useQuery } from 'react-query';
import {getAllMessagesInReport} from '../../actions/getAllMessagesInReport'
import { updateReportAccept, updateReportReject } from '../../actions/updateReportStatus';
// Add the icon to the library
library.add(faFile);
library.add(faVideo)


export default function SingleReportUser() {
  interface AttachmentType {
    url: string;
    contentType: string;
  }
  interface ReportType {
    id: number;
    room: string;
    weakness: {
      type: string;
      name: string;
    };
    asset: {
      assetName: string;
      assetType: string;
    };
    proofOfConcept: {
      title: string;
      vulnerabilityUrl: string;
      description: string;
    };
    discoveryDetails: { 
      timeSpend: string;
    };
    attachments: AttachmentType[];
    methodName: string;
    lastActivity: string;
    rewardsStatus: string;
    reportTemplate: string;
    collaborators: {
      id: number;
      hackerUsername: string;
      collaborationPercentage: number;
    }[];
    severity: string;
  }
  interface UserType {
    companyName: string;
    reports: ReportType[];
  }
  interface CollaboratorType {
    id: number;
    hackerUsername: string;
    collaborationPercentage: number;
  }
  const { id } = useParams();
  const [proofConceptTitle, setProofConceptTitle] = useState<string>("");
  const [onChat, setOnChat] = useState(false)
  const [allAssets, setAllAssets] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<AttachmentType[]>([]);
  const [enlarged, setEnlarged] = useState(null);
  const [room, setRoom] = useState<string>('');
  const [csrfToken, setCsrfToken] = useState('')
  const chatAreaRef = useRef(null);
  // const stompClientRef = useRef(null);
  const stompClientRef = useRef<CompatClient | null>(null);
  const [message, setMessage] = useState("")
  const [newMessages, setNewMessages] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);
  const [connectionError, setConnectionError] = useState('');
  const [iamHacker, setIamHacker] = useState<boolean>(false);
 
  const [collaborators, setCollaborators] = useState<CollaboratorType[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
 
  const [userData, setUserData] = useState<any>(null);

  const { data: report } = useGetReportById(`${id}`)
  const [messagesFetched, setMessagesFetched] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { data: messages } = useQuery(
    ['messages', room],      
    () => getAllMessagesInReport(room),  
    {
        enabled: !!room && !messagesFetched,   
        onSuccess: (fetchedMessages) => {
            console.log('Messages fetched:', fetchedMessages);
            setMessagesFetched(true)
        },
        onError: (error) => {
            console.error('Error fetching messages:', error);
        }
    }
);
  useEffect(() => {
        const userString = localStorage.getItem("company");
       
        if (userString) {
            
            const userParsed = JSON.parse(userString);
            setUserData(userParsed);
            setAccessToken(userParsed?.accessToken);
            setIamHacker(false)
      
        } 
        console.log("Report updated:", report);
        setCollaborators(report?.collaborators || [])
        setRoom(report?.room || '')
        setAttachments(report?.attachments || [])
        console.log("Room num: " + room)
        
    }, [report])

  useEffect(() => {
    //..................Taking csrf...............
    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
    fetch(`${apiUrl}/api/csrf/csrf-token`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setCsrfToken(data.token);
        console.log("CSRF: " + csrfToken)
      })
      .catch(error => console.error('Error fetching CSRF token:', error));
  }, [accessToken])
  //........Connect Socket............................

  const connect = (e) => {
 
    setOnChat(true)
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'X-CSRF-TOKEN': csrfToken,
      'Content-Type': 'application/json'
    };
    const apiUrl = import.meta.env.VITE_APP_BASE_URL;

    const socket = new SockJS(`${apiUrl}/ws`);
    const stompClient = Stomp.over(() => socket)
    stompClient.debug = (str) => {
      console.log(str);
    };
    stompClientRef.current = stompClient
    stompClient.connect(headers, onConnected, onErrorInConnection);
  }

  const closeSocket = () => {
    setOnChat(false)
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
    }
  };
  //...........On Connect
  const onConnected = () => {
        console.log('Socket connected');

        stompClientRef.current.subscribe('/topic/error', onErrorReceived, {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRF-TOKEN': csrfToken,
            'Content-Type': 'application/json'
        });
        // for service/controller and validation exceptions
        stompClientRef.current.subscribe('/user/queue/errors', onErrorReceived, {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRF-TOKEN': csrfToken,
            'Content-Type': 'application/json'
        });


        stompClientRef.current.subscribe(`/topic/${room}/messagesInReport`, onMessageReceived, {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRF-TOKEN': csrfToken,
            'Content-Type': 'application/json'
        });
    };
  //............On Message
  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    console.log('Message received:', message);

    // Determine message direction based on isHacker
    const messageClass = message.isHacker === iamHacker ? 'message-left' : 'message-right';
    console.log(messageClass)
    setNewMessages(prevMessages => [...prevMessages, { ...message, direction: messageClass }]);
    // console.log(newMessages)

  };
  //..........On Error
  const onErrorReceived = (payload) => {
    console.error('Error received:', payload.body);

    setError(prev => [...prev, payload.body]);
    // scrollToBottom();
  };
  //.........On Error In Connection
  const onErrorInConnection = (frame) => {
    console.error('WebSocket connection error frame:', frame);

    // Check if the frame has a body
    if (frame && frame.body) {
      try {
        // Parse the error message if it's in JSON format
        const errorMessage = JSON.parse(frame.body);
        console.error('Error message body:', errorMessage);
      } catch (e) {
        // If it's not JSON, log the raw body
        console.error('Error message body (raw):', frame.body);
      }
    }

    setConnectionError('Could not connect to WebSocket server. Please refresh this page to try again!');
  };

  //...............Send New Message ..................
  const sendMessage = async (e) => {
    console.log(iamHacker)
    e.preventDefault();
    if (!stompClientRef.current || !stompClientRef.current.connected) {
      console.error("Cannot send message: STOMP client is not connected.");
      setConnectionError("Could not send message: No active WebSocket connection.");
      return;
    }
    if (message.trim()) {
      const chatMessage = {
        isReplied: false,
        content: message.trim(),
        // replyToMessageId: null
      };

      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'X-CSRF-TOKEN': csrfToken,
        'Content-Type': 'application/json'
      };

      stompClientRef.current.send(`/app/${room}/sendMessageInReport`, headers, JSON.stringify(chatMessage));
      setMessage('');
    }
  }
  //..................................................

  const handleEnlarge = (index) => {
    setEnlarged(enlarged === index ? null : index);
  };

  const getAttachmentStyle = (index) => {
    if (enlarged === index) {
      return {
        width: '300px',
        height: '180px',
        transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out',
        zIndex: 1000,
        position: 'relative',
      };
    } else {
      return {
        width: '100px',
        height: '40px',
        transition: 'transform 0.3s ease-in-out',
      };
    }

  }

  const handleAccept = async () => {
    try {
      setButtonDisabled(true);
      await updateReportAccept(report?.id);
    } catch (error) {
      console.error("Failed to update report status:", error);
      setButtonDisabled(false);
    }
  };

  const handleReject = async () => {
    try {
      setButtonDisabled(true); 
      await updateReportReject(report?.id);
    } catch (error) {
      console.error("Failed to update report status:", error);
      setButtonDisabled(false);
    }
  };
  const showButtons =
    report?.statusForCompany !== "ASSESSED" &&
    report?.statusForCompany !== "REJECTED" &&
    !buttonDisabled;; 
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">


      <div className="bg-[url(/assets/images/bg-3.png)] bg-center bg-no-repeat bg-cover lg:px-20 sm:px-8 px-3  pb-16 flex-1 z-[400] ">
        <div className="lg:flex my-4  gap-6 relative hidden mb-16">
          <div className="hexagon5 mt-3  min-w-[60px]">
            <img src="/assets/images/programimage2.jpg" alt="" className="" />
          </div>
          <div className="xl:w-[60%] w-full">
            <h2 className="sm:text-[18px] text-[16px] font-[600]">{ }</h2>
            <p className="sm:text-[18px] text-[16px] font-[600]">
              Business title
            </p>
            <a href="http://www.program.com/" className="text-[#5BA2F8]">
              http://www.program.com/
            </a>
            <div className="flex justify-between gap-2 flex-wrap">
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Reports Resolved
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">12</p>
              </div>
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Assets in scope
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">10</p>
              </div>
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Average bounty
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">8</p>
              </div>
            </div>
          </div>{" "}
          <div className="flex-1 flex items-center gap-2 justify-end ml-4">
            <img src="/assets/images/starempty.png" alt="star" className="cursor-pointer" />
            <p>Bookmarks</p>
          </div>
        </div>

        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4  ">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2B0E2B]">
            1
          </div>
          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
              Asset
            </div>
            <div className="bg-[#3D0436] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-row">
                <div className="lg:-[40%] w-full">
                  <Label className="flex  bg-[#2B0E2B] rounded-2xl px-4 w-full">
                    <Input value={report?.asset?.assetName} type="text" placeholder="Max Bounty"
                      className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                  </Label>
                </div>

                <div className="lg:-[40%] w-full">
                  <Label className="flex  bg-[#2B0E2B] rounded-2xl px-4 w-full">
                    <Input value={report?.asset?.assetType} type="text" placeholder="Max Bounty"
                      className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                  </Label>
                </div>
              </div>
              <div className="overflow-y-scroll mt-4 bluescroll max-h-[280px]">
                {allAssets?.map((item: string) => (
                  <Line text={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2B0E2B]">
            2
          </div>
          <div className=" rounded-xl   flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
              Report template
            </div>
            <div className="bg-[#3D0436] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-row">
                <div className=" w-full">
                  <Label className="flex  bg-[#2B0E2B] rounded-2xl px-4 w-full">
                    <Input type="text" placeholder="Max Bounty" value={report?.reportTemplate}
                      className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2B0E2B]">
            3
          </div>
          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
              Weakness
            </div>
            <div className="bg-[#3D0436] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-row">

                <div className="lg:-[40%] w-full">
                  <Label className="flex  bg-[#2B0E2B] rounded-2xl px-4 w-full">
                    <Input value={report?.weakness.name} type="text" placeholder="Max Bounty"
                      className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                  </Label>
                </div>

                <div className="lg:-[40%] w-full">


                  <Label className="flex  bg-[#2B0E2B] rounded-2xl px-4 w-full">
                    <Input value={report?.weakness.type} type="text" placeholder="Max Bounty"
                      className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 mt-4 flex-col sm:flex-row gap-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2B0E2B]">
            4
          </div>
          <div className=" overflow-hidden  flex-1">
            <div
              className="rounded-xl sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
              Severity
            </div>
            {report?.methodName === 'CVSS' ? (
              <div className="bg-[#3D0436] py-8 px-8 ">
                <div className="max-w-[1000px] mx-auto flex justify-between lg:items-center mb-4  flex-col lg:flex-row gap-4">
                  <RadioInput name="test1" value="test2" id="test2" label="CVSS" defaultChecked />
                </div>
                <div className="items-center gap-4 max-w-[1000px] mx-auto">
                  <h2 className="sm:text-[18px] text-[16px] font-[600] mb-2">
                    Calculation: {report?.score}
                  </h2>
                </div>
                <div className="mt-4 max-w-[1000px] mx-auto">
                  <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-2 gap-4">

                    <div className="h-[70px] bg-[#3D0436] flex items-center sm:px-4 px-4 border-b border-black gap-4">
                      <div className="min-w-[200px] mt-2 xl:mt-0">
                        Attack vector
                      </div>
                      <div className="">
                        <RadioInput name="attackvector" value={report?.attackvector} id="Network" label={report?.attackVector} defaultChecked />
                      </div>
                    </div>

                    <div className="h-[70px] bg-[#3D0436] flex items-center sm:px-4 px-4 border-b border-black gap-4">
                      <div className="min-w-[200px] mt-2 xl:mt-0">
                        Scope
                      </div>
                      <div className="">
                        <RadioInput name="scope" value={report?.scope} id="Low3" label={report?.scope} defaultChecked />
                      </div>
                    </div>

                    <div className="h-[70px] bg-[#3D0436] flex items-center sm:px-4 px-4 border-b border-black gap-4">
                      <div className="min-w-[200px] mt-2 xl:mt-0">
                        Attack complexity
                      </div>
                      <div className="">
                        <RadioInput name="attackcomplexity" value={report?.attackComplexity} id="Network" label={report?.attackComplexity} defaultChecked />
                      </div>
                    </div>

                    <div className="h-[70px] bg-[#3D0436] flex items-center sm:px-4 px-4 border-b border-black gap-4">
                      <div className="min-w-[200px] mt-2 xl:mt-0">
                        Confidentially
                      </div>
                      <div className="">
                        <RadioInput name="confidentiality" value={report?.confidentiality} id="Low2" label={report?.confidentiality} defaultChecked />
                      </div>
                    </div>

                    <div className="h-[70px] bg-[#3D0436] flex items-center sm:px-4 px-4 border-b border-black gap-4">
                      <div className="min-w-[200px] mt-2 xl:mt-0">
                        User interactions
                      </div>
                      <div className="">
                        <RadioInput name="userinteraction" value={report?.userInteractions} id="Network" label={report?.userInteractions} defaultChecked />
                      </div>
                    </div>

                    <div className="h-[70px] bg-[#3D0436] flex items-center sm:px-4 px-4 border-b border-black gap-4">
                      <div className="min-w-[200px] mt-2 xl:mt-0">
                        Integrity
                      </div>
                      <div className="">
                        <RadioInput name="integrity" value={report?.integrity} id="Low4" label={report?.integrity} defaultChecked />
                      </div>
                    </div>

                    <div className="h-[70px] bg-[#3D0436] flex items-center sm:px-4 px-4 border-b border-black gap-4">
                      <div className="min-w-[200px] mt-2 xl:mt-0">
                        Privileges required
                      </div>
                      <div className="">
                        <RadioInput name="privileges" value={report?.privilegesRequired} id="Network" label={report?.privilegesRequired} defaultChecked />
                      </div>
                    </div>

                    <div className="h-[70px] bg-[#3D0436] flex items-center sm:px-4 px-4 border-b border-black gap-4">
                      <div className="min-w-[200px] mt-2 xl:mt-0">
                        Availability
                      </div>
                      <div className="">
                        <RadioInput name="availability" value={report?.availability} id="Low1" label={report?.availability} defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 sm:px-8 px-4">
                <div
                  className="max-w-[1000px] mx-auto flex justify-between lg:items-center mb-4 flex-col lg:flex-row gap-4 ">
                  <RadioInput name="test1" value="test1" id="test1" label="Manual" defaultChecked />
                </div>

                <div className="mt-4 ">
                  <div className='flex max-w-[1000px] mx-auto'>

                    <div
                      className="h-[70px]  w-full bg-[#3D0436] flex items-center justify-between px-4  border-b border-black xl:flex-row gap-4">
                      <div className=" mt-2 xl:mt-0">
                        Manual
                      </div>
                      <div
                        className="">
                        <RadioInput name="manual" value={report?.rewardsStatus} id="Network" label={report?.rewardsStatus} defaultChecked />
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2B0E2B]">
            5
          </div>
          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
              Proof of Concept
            </div>
            <div className="bg-[#3D0436] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-col">
                <div className="w-full">
                  <h2 className="sm:text-[18px] text-[16px] font-[600] mt-4">
                    Title
                  </h2>
                  <Input type="text" placeholder="Title"
                    className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 border-[#2451F5]  focus-visible:ring-offset-0 placeholder:text-white py-6 mt-2"
                    value={report?.proofOfConcept?.title} onChange={(e) => setProofConceptTitle(e.target.value)}
                  />
                </div>
                <div className="w-full">

                  <h2 className="sm:text-[18px] text-[16px] font-[600] mt-4">
                    URL
                  </h2>
                  <Input type="text" placeholder="URL" readOnly
                    className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 focus-visible:ring-offset-0 placeholder:text-white mt-2 py-6"
                    value={report?.proofOfConcept?.vulnerabilityUrl} />
                </div>
                <div className="w-full">

                  <h2 className="sm:text-[18px] text-[16px] font-[600] mt-4">
                    Descriptions
                  </h2>
                  <Textarea type="text" placeholder="Description" value={report?.proofOfConcept?.description} readOnly
                    className="bg-transparent h-[100px] text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 focus-visible:ring-offset-0 placeholder:text-white pb-5 mt-2 " />
                </div></div>



            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">

          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2B0E2B]">
            6
          </div>

          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
              Attachments
            </div>

            <div className="bg-[#3D0436] py-8 sm:px-8 px-4">
              <div className="flex gap-4 flex-col">
                {attachments && attachments.length > 0 ? (
                  <div className="w-full flex gap-9">
                    {attachments.map((a, index) => (
                      (a.contentType === 'image/jpeg' || a.contentType === 'image/png') ? (
                        <div key={index} onClick={() => handleEnlarge(index)} >
                          <img
                            className="cursor-pointer"
                            src={a.url}
                            alt={`attachment-${index}`}
                            style={getAttachmentStyle(index)} />


                        </div>
                      ) : a.contentType.startsWith('video/') ? (
                        <div key={index}>
                          <a href={a.url} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faVideo} size="2xl" style={{ color: "#f3f4f7" }} />
                            Video
                          </a>
                        </div>
                      ) : (
                        <div key={index}>
                          <a href={a.url} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFile} size="2xl" style={{ color: "#f3f4f7" }} />
                            File
                          </a>
                        </div>
                      )

                    ))}
                  </div>
                ) : (
                  <div className="w-full">No attachments</div>
                )}

              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2B0E2B]">
            7
          </div>
          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
              Discovery details
            </div>
            <div className="bg-[#3D0436] py-8 sm:px-8 px-4">
              <div className="flex gap-4 flex-col">
                <div>
                  Time Spent
                </div>
                <div className="w-full">
                  <Input value={report?.discoveryDetails?.timeSpend} type="text" placeholder="Time spend" readOnly
                    className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 border-[#2451F5]  focus-visible:ring-offset-0 placeholder:text-white py-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex  flex-col  lg:flex-row lg:gap-16 gap-4  mt-4 ">
          <div className="flex flex-col gap-4">

          </div>
          <div className="flex-1 w-full flex gap-[50px]">
            {/* HACKERS */}

            {collaborators.map((c, i) => (
              <div key={i} className="bg-[#3D0436]  px-14 py-6 rounded-2xl flex items-center justify-between w-full relative">
                <div className="flex items-center">
                  <div className="hexagon5 m-auto md:m-0 ">
                    <img src={"/assets/images/profileimage.jpeg"} alt="" />
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="text-[18px] font-[600]">{c.hackerUsername}</h3>
                    <div className="flex items-center gap-2">
                      <img src="/assets/flag.svg" className="w-[18px] " />
                      <p className="text-[16px] font-[400]">Baku</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFDE31] rounded-l-xl rounded-r-xl overflow-hidden flex">
                  <input type="number"
                    className="w-[50px] py-1 px-3 bg-[#FFDE31] border-r border-black text-white focus:outline-none focus-visible:ring-0" value={c.collaborationPercentage}
                  />
                  <div className="bg-[#FFDE31] w-[50px]   flex items-center justify-center "
                  >
                    %
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-16 gap-4 mt-4 lg:ml-14">
                    <div className="flex-1 w-full flex gap-[50px] lg:ml-2">
                        {onChat ? (
                            <div className="flex flex-col gap-4 w-full">
                                <div className="rounded-xl overflow-hiddenp-8 flex max-h-[380px] justify-center">
                                    <div className="flex flex-col w-full p-5 overflow-y-scroll bluescroll ">
                                        {/* Messages Rendering */}
                                        {[...messages, ...newMessages].map((msg, i) => {
                                            if (!msg) {
                                                return null;
                                            }

                                            return (
                                                <div key={i} className={`flex flex-col ${msg.isHacker ? 'justify-start' : 'justify-end'} gap-5 px-3 w-full`}>
                                                    <div className={`flex items-start gap-3 w-full ${msg.isHacker ? 'flex-row' : 'flex-row-reverse'}`}>
                                                        {/* Message Header */}
                                                        <div className={`flex justify-between items-center w-full ${msg.isHacker ? '' : 'flex-row-reverse'}`}>
                                                            {/* Render Profile Image and Name only if it's different from the last message */}
                                                            {(i === 0 || (messages[i - 1] && messages[i - 1].isHacker !== msg.isHacker)) && (
                                                                <div className={`flex items-center gap-4 mt-4 ${msg.isHacker ? '' : 'flex-row-reverse'}`}>
                                                                    <div className="hexagon5">
                                                                        <img src={"/assets/images/profileimage.jpeg"} alt="" />
                                                                    </div>
                                                                    <span className="text-white font-bold text-lg">{msg.isHacker ? 'Hacker' : 'Company'}</span>
                                                                </div>
                                                            )}

                                                            {/* Timestamp */}
                                                            {(i === 0 || (messages[i - 1] && messages[i - 1].isHacker !== msg.isHacker)) && (
                                                                <span className={`text-[#A5A5A5] text-2xl font-semibold mt-4 ${msg.isHacker ? 'text-left' : 'text-right'}`}>
                                                                    {new Date(msg.createdAt).toLocaleString('sv-SE', { timeZone: 'Asia/Baku', hour12: false }).replace('T', ' ').slice(0, 16)} UTC
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Message Body */}
                                                    <div className={`flex ${msg.isHacker ? 'justify-start' : 'justify-end'}`}>
                                                        <p className={`py-4 px-7 max-w-[70%] h-auto rounded-3xl text-white overflow-wrap break-words ${msg.isHacker ? 'bg-[#061723]' : 'bg-[#4A4009]'}`}>
                                                            {msg.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <form
                                    className="flex items-center justify-between pl-4 h-[50px] rounded-[30px] w-full bg-[#0C194A] my-3 px-3"
                                    onSubmit={sendMessage}
                                >
                                    <input
                                        type="text"
                                        className="w-8/12 outline-none h-[35px] pl-2 text-white bg-inherit"
                                        placeholder="Send your message ..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src="/assets/images/fileicon.svg"
                                            className="cursor-pointer transition ease-in-out h-[30px] w-[30px] hover:bg-sky-700 p-[5px] rounded-[25px]"
                                            alt="File"
                                        />
                                        <img
                                            src="/assets/images/cameraicon.svg"
                                            className="cursor-pointer transition ease-in-out h-[30px] w-[30px] hover:bg-sky-700 rounded-[10px] p-1"
                                            alt="Camera"
                                        />
                                        <button
                                            type="submit"
                                            className="cursor-pointer flex items-center justify-center w-[75px] h-[40px] p-1 bg-[#FFDE31] hover:bg-[#e4c52b] rounded-[30px]"
                                        >
                                            <img
                                                src="/assets/images/sendicon.svg"
                                                className="transition ease-in-out h-[30px] w-[30px] rounded-[10px] p-1"
                                                alt="Send"
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className='py-8 rounded-2xl flex items-center justify-between w-full'>
                                <button
                                    className='flex gap-1 items-center bg-[#FFDE31] max-w-[270px] text-black font-semibold min-h-[40px] py-4 px-9 rounded-[30px]'
                                    onClick={connect}
                                >
                                    <img
                                        src="/assets/images/messageicon.svg"
                                        className="transition ease-in-out h-[30px] w-[30px] rounded-[10px] p-1"
                                        alt="Message icon"
                                    />
                                    Chat with Hacker
                                </button>
                            </div>
                        )}
                    </div>
                </div>
        <div className="flex  flex-col  lg:flex-row lg:gap-16 gap-4  mt-4 ">
          <div className="flex flex-col gap-4"></div>
          <div className="flex-1 w-full flex gap-[50px]">
            {onChat ? (
              <button className='bg-[#2451F5] max-w-[250px] text-white min-h-[40px] py-2 px-3 rounded-[30px]' onClick={closeSocket}>Stop Chat</button>
            ) :
              (<></>)}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          {showButtons ? (
            <>
              <Button
                onClick={handleAccept}
                disabled={buttonDisabled}
                className={`px-10 py-6 ${
                  buttonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
              >
                Accept
              </Button>
              <Button
                onClick={handleReject}
                disabled={buttonDisabled}
                className={`px-10 py-6 ${
                  buttonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400`}
              >
                Reject
              </Button>
            </>
          ) : (
            <span className="text-lg font-bold bg-white px-10 py-3 text-black rounded-lg">
              {report?.statusForCompany === "ASSESSED" ? "Accepted" : "Rejected"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}