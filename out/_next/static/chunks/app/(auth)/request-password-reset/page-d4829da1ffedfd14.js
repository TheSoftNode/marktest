(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[606],{58714:function(e,t,r){Promise.resolve().then(r.bind(r,3466))},3466:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return f}});var n=r(57437),o=r(62869),a=r(95186),i=r(21123),s=r(26748),l=r(51817),u=r(27648),d=r(2265),c=r(69064);function f(){let[e,t]=(0,d.useState)(""),[r,{isLoading:f}]=(0,i.Pw)(),m=async n=>{n.preventDefault();try{let n=await r({email:e}).unwrap();c.ZP.success(n.message||"Password reset instructions sent to your email"),t("")}catch(e){var o;c.ZP.error((null===(o=e.data)||void 0===o?void 0:o.message)||"Failed to send reset instructions")}};return(0,n.jsx)("main",{className:"min-h-[calc(100vh-4rem)] p-8 flex items-center justify-center bg-[conic-gradient(from_45deg_at_60%_50%,#4f46e520_0deg,#ffffff_90deg,#7e22ce20_180deg,#ffffff_270deg,#4f46e520_360deg)]    relative before:absolute before:inset-0    before:bg-gradient-to-br before:from-indigo-50/80 before:via-white/90 before:to-purple-50/80    before:backdrop-blur-3xl",children:(0,n.jsx)("div",{className:"w-full max-w-md",children:(0,n.jsxs)("div",{className:"bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden",children:[(0,n.jsx)("div",{className:"absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"}),(0,n.jsxs)("div",{className:"flex flex-col items-center mb-6",children:[(0,n.jsx)(s.Z,{className:"h-12 w-12 text-indigo-500 mb-4"}),(0,n.jsx)("h1",{className:"text-2xl font-bold text-center text-gray-900",children:"Reset Password"}),(0,n.jsx)("p",{className:"text-gray-600 text-center mt-2",children:"Enter your email address and we'll send you instructions to reset your password."})]}),(0,n.jsxs)("form",{onSubmit:m,className:"space-y-4",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Email"}),(0,n.jsx)(a.I,{type:"email",value:e,onChange:e=>t(e.target.value),placeholder:"Enter your email",required:!0})]}),(0,n.jsx)(o.z,{type:"submit",className:"w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500    hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white",disabled:f,children:f?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.Z,{className:"mr-2 h-4 w-4 animate-spin"}),"Sending Instructions..."]}):"Send Reset Instructions"})]}),(0,n.jsx)("div",{className:"mt-6 text-center",children:(0,n.jsx)(u.default,{href:"/login",className:"text-sm text-indigo-600 hover:text-indigo-500",children:"Back to Sign In"})})]})})})}},62869:function(e,t,r){"use strict";r.d(t,{d:function(){return l},z:function(){return u}});var n=r(57437),o=r(2265),a=r(37053),i=r(90535),s=r(94508);let l=(0,i.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),u=o.forwardRef((e,t)=>{let{className:r,variant:o,size:i,asChild:u=!1,...d}=e,c=u?a.g7:"button";return(0,n.jsx)(c,{className:(0,s.cn)(l({variant:o,size:i,className:r})),ref:t,...d})});u.displayName="Button"},95186:function(e,t,r){"use strict";r.d(t,{I:function(){return i}});var n=r(57437),o=r(2265),a=r(94508);let i=o.forwardRef((e,t)=>{let{className:r,type:o,...i}=e;return(0,n.jsx)("input",{type:o,className:(0,a.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...i})});i.displayName="Input"},94508:function(e,t,r){"use strict";r.d(t,{cn:function(){return a}});var n=r(61994),o=r(53335);function a(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,o.m6)((0,n.W)(t))}},26748:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});let n=(0,r(79205).Z)("KeyRound",[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]])},51817:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});let n=(0,r(79205).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},21123:function(e,t,r){"use strict";r.d(t,{$h:function(){return y},Bl:function(){return l},Pw:function(){return g},TG:function(){return b},YA:function(){return c},_y:function(){return f},gL:function(){return v},iJ:function(){return s},iS:function(){return m},p6:function(){return d},qQ:function(){return u}});var n=r(24960),o=r(23557);let a=(0,n.ni)({baseUrl:"".concat("https://easmark-platform.onrender.com","/users"),prepareHeaders:e=>{let t=localStorage.getItem("token");return t&&e.set("authorization","Bearer ".concat(t)),e}}),i=async(e,t,r)=>{let n=await a(e,t,r);if(console.log(n),null==n?void 0:n.error){var o;if((null===(o=n.error.data)||void 0===o?void 0:o.code)==="token_not_valid"){let o=localStorage.getItem("token");(await t.dispatch(s.endpoints.refreshToken.initiate({access_token:o||""}))).data?n=await a(e,t,r):(localStorage.removeItem("token"),window.location.href="/login")}}return n},s=(0,o.LC)({reducerPath:"authApi",baseQuery:i,tagTypes:["Auth"],endpoints:e=>({signup:e.mutation({query:e=>({url:"/signup/",method:"POST",body:e}),onQueryStarted:async(e,t)=>{let{queryFulfilled:r}=t;try{let{data:e}=await r;localStorage.setItem("token",e.access)}catch(e){}}}),verifyEmail:e.mutation({query:e=>({url:"/verify-email/",method:"POST",body:e})}),resendVerification:e.mutation({query:e=>({url:"/resend-verification/",method:"POST",body:e})}),login:e.mutation({query:e=>({url:"/login/",method:"POST",body:e}),onQueryStarted:async(e,t)=>{let{queryFulfilled:r}=t;try{let{data:e}=await r;localStorage.setItem("token",e.access)}catch(e){}}}),logout:e.mutation({query:()=>({url:"/logout/",method:"POST"}),onQueryStarted:async(e,t)=>{let{queryFulfilled:r}=t;try{await r,localStorage.removeItem("token")}catch(e){}}}),getMe:e.query({query:()=>({url:"/me"})}),refreshToken:e.mutation({query:e=>({url:"/refresh/",method:"POST",body:e}),onQueryStarted:async(e,t)=>{let{queryFulfilled:r}=t;try{let{data:e}=await r;localStorage.setItem("token",e.access)}catch(e){}}}),requestPasswordReset:e.mutation({query:e=>({url:"/password/reset/",method:"POST",body:e})}),updateProfile:e.mutation({query:e=>({url:"/profile/update/",method:"PUT",body:e})}),resetPassword:e.mutation({query:e=>({url:"/password/reset/confirm/",method:"POST",body:e})}),changePassword:e.mutation({query:e=>({url:"/password/change/",method:"POST",body:e})})})}),{useSignupMutation:l,useVerifyEmailMutation:u,useResendVerificationMutation:d,useLoginMutation:c,useLogoutMutation:f,useGetMeQuery:m,useRefreshTokenMutation:h,useRequestPasswordResetMutation:g,useResetPasswordMutation:v,useChangePasswordMutation:y,useUpdateProfileMutation:b}=s},90535:function(e,t,r){"use strict";r.d(t,{j:function(){return i}});var n=r(61994);let o=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,a=n.W,i=(e,t)=>r=>{var n;if((null==t?void 0:t.variants)==null)return a(e,null==r?void 0:r.class,null==r?void 0:r.className);let{variants:i,defaultVariants:s}=t,l=Object.keys(i).map(e=>{let t=null==r?void 0:r[e],n=null==s?void 0:s[e];if(null===t)return null;let a=o(t)||o(n);return i[e][a]}),u=r&&Object.entries(r).reduce((e,t)=>{let[r,n]=t;return void 0===n||(e[r]=n),e},{});return a(e,l,null==t?void 0:null===(n=t.compoundVariants)||void 0===n?void 0:n.reduce((e,t)=>{let{class:r,className:n,...o}=t;return Object.entries(o).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...s,...u}[t]):({...s,...u})[t]===r})?[...e,r,n]:e},[]),null==r?void 0:r.class,null==r?void 0:r.className)}}},function(e){e.O(0,[557,181,64,648,971,117,744],function(){return e(e.s=58714)}),_N_E=e.O()}]);