// src/app/event/[id]/page.js
import { PrismaClient } from '@prisma/client';
import React from "react";
import Link from 'next/link';
import styles from "./page.module.css";
import Image from 'next/image';

const prisma = new PrismaClient();

async function getEvent(id) {
  if (!id) {
    console.error("ID is missing or invalid");
    return null;
  }
  
  const eventId = parseInt(id, 10);
  
  if (isNaN(eventId)) {
    console.error("Invalid ID format");
    return null;
  }

  const event = await prisma.storeEvent.findUnique({
    where: { id: eventId },
  });
  
  return event;
}

export default async function EventPage({ params }) {
  const { id } = params;
  const event = await getEvent(id);

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div className="container mt-20px">
      <nav className="navbar navbar-expand-lg navbar-light bg-white color-white">
        <div className="container-fluid justify-content-between">
          <a className="navbar-brand" href="/">TechPass</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/createevent">Create Event</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link" href="/events">All Events</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/avatar-2.png" width="30" height="30" alt="profile image" className='rounded-circle'/>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li></li>
                  <li><a className="dropdown-item" href="/login">Logout</a></li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-lg-10 mb-8">
            <h1 className={styles.h1}>{event.eventName}</h1>
            
            <div className="row text-center mb-4">
              <img src="/175.jpg" alt="Banner" className="banner-image img-fluid" style={{ borderRadius: '10px', maxHeight: '400px', maxWidth: 'auto'}} />
            </div>
            <div className="row mb-4 mt-4 rounded shadow">
              <div className="col-md-6 mt-3">
                <h4>Event Details</h4>
                <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                <p>Start Time: {event.startTime}</p>
                <p>End Time: {event.endTime}</p>
              </div>
              <div className="col-md-6 text-md-right mt-4">
                <button type="button" className="btn btn-success mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2 text-primary">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>   
                  Share Event
                </button>
                <br />
                <h4>Ticket info</h4>
                <p>Ticket Price: {event.ticketPrice}</p>
              </div>
            </div>

            <div className="card row mb-4 rounded shadow">
              <h4>Location Details</h4>
              <p>Location: {event.location}</p>
              <img src="/map.jpg" alt="Map" className="img-fluid rounded" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>

            <div className="row mb-4 rounded shadow">
              <div className="col-auto">
                <img src="/avatar-2.png" alt="Host" className="rounded-circle" style={{ maxWidth: '150px', maxHeight: '150px' }} />
              </div>
              <div className="col-md-4 mt-2 mb-2">
                <h4>Organizer Details</h4>
                <div className="mb-4">
                  <p>{event.firstName} {event.lastName}</p>
                </div>
                <div className="mb-2 d-flex justify-content-evenly">
                  <button type="button" className="btn btn-outline-info px-5 radius-30 mr-2">Contact</button>
                  <button type="button" data-mdb-button-init="" data-mdb-ripple-init="" class="btn btn-outline-success btn-rounded ripple-surface-dark" data-mdb-ripple-color="dark" data-mdb-button-initialized="true" aria-pressed="false">+
                    Follow
                  </button>
                </div>
              </div>
            </div>

            <div className="card row mb-4 rounded shadow">
              <h2>Event Description</h2>
              <p className="text-justify">{event.eventDescription}</p>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-8">
              <a href={`/editEvent/${id}`}>
                <p className="btn btn-secondary px-5 radius-30">Edit</p>
              </a>
              <button type="button" className="btn btn-success px-5 radius-30">
                <Link href="/events">Publish</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

